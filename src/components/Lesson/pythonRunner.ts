export const pyodideBase = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const timeLimit = 8000;

const workerSource = `
importScripts(${JSON.stringify(`${pyodideBase}pyodide.js`)});
const ready = loadPyodide({ indexURL: ${JSON.stringify(pyodideBase)} }).then((py) => {
  py.setStdin({ stdin: () => { throw new Error('input() não funciona aqui: escreva o valor direto no código.'); } });
  return py;
});
ready.then(() => self.postMessage({ type: 'ready' }), (error) => self.postMessage({ type: 'failed', error: String(error) }));
self.onmessage = async (event) => {
  const { id, code, tests } = event.data;
  const py = await ready;
  let output = '';
  const write = (text) => { output += text + '\\n'; self.postMessage({ type: 'output', id, text }); };
  py.setStdout({ batched: write });
  py.setStderr({ batched: write });
  const scope = py.globals.get('dict')();
  let error = null;
  try {
    await py.runPythonAsync(code, { globals: scope });
  } catch (failure) {
    error = String(failure && failure.message ? failure.message : failure);
  }
  scope.set('__saida__', output);
  scope.set('__codigo__', code);
  const checks = tests.map((test) => {
    if (error) return false;
    try {
      scope.set('__teste__', test);
      return py.runPython('bool(eval(__teste__))', { globals: scope }) === true;
    } catch (failure) {
      return false;
    }
  });
  scope.destroy();
  self.postMessage({ type: 'done', id, output, error, checks });
};
`;

export interface PythonRun {
  output: string;
  error: string | null;
  checks: boolean[];
}

type Listener = (message: { type: string; id?: number; [key: string]: unknown }) => void;

let worker: Worker | undefined;
let ready: Promise<void> | undefined;
let sequence = 0;
const listeners = new Set<Listener>();

function boot(): Promise<void> {
  if (ready && worker) return ready;
  const url = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
  worker = new Worker(url);
  worker.onmessage = (event) => listeners.forEach((listener) => listener(event.data));
  ready = new Promise((resolve, reject) => {
    const listener: Listener = (message) => {
      if (message.type === 'ready') resolve();
      if (message.type === 'failed') reject(new Error(String(message.error)));
      if (message.type === 'ready' || message.type === 'failed') listeners.delete(listener);
    };
    listeners.add(listener);
    worker?.addEventListener('error', () => reject(new Error('worker')), { once: true });
  });
  ready.catch(() => reset());
  return ready;
}

function reset() {
  worker?.terminate();
  worker = undefined;
  ready = undefined;
}

export const pythonLoaded = () => !!worker;

export async function runPython(
  code: string,
  tests: string[],
  onOutput?: (text: string) => void,
): Promise<PythonRun> {
  await boot().catch(() => boot());
  const id = ++sequence;
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      listeners.delete(listener);
      reset();
      resolve({
        output: '',
        error:
          'O código passou de 8 segundos e foi interrompido. Um laço que nunca termina (while sem condição de parada) é a causa mais comum.',
        checks: tests.map(() => false),
      });
    }, timeLimit);
    const listener: Listener = (message) => {
      if (message.id !== id) return;
      if (message.type === 'output') onOutput?.(String(message.text));
      if (message.type === 'done') {
        window.clearTimeout(timer);
        listeners.delete(listener);
        resolve({
          output: String(message.output),
          error: message.error ? explainPythonError(String(message.error)) : null,
          checks: (message.checks as boolean[]) || [],
        });
      }
    };
    listeners.add(listener);
    worker?.postMessage({ id, code, tests });
  });
}

const hints: Array<[RegExp, string]> = [
  [
    /NameError: name '([^']+)'/,
    'O Python não conhece o nome "$1". Ele foi criado antes desta linha? O nome está escrito igual, com as mesmas maiúsculas?',
  ],
  [
    /IndentationError/,
    'O recuo (os espaços no começo da linha) não bate. Depois de uma linha que termina com ":", o bloco precisa de 4 espaços, todos iguais.',
  ],
  [
    /SyntaxError/,
    'O Python não conseguiu ler esta linha. Confira dois-pontos no fim de if/for/def, aspas e parênteses fechados.',
  ],
  [
    /TypeError: can only concatenate str/,
    'Você tentou juntar texto com número usando +. Converta antes: str(numero), ou use uma f-string.',
  ],
  [
    /TypeError/,
    'Um valor de um tipo foi usado onde se esperava outro (texto, número, lista...). Confira o tipo com type(valor).',
  ],
  [/ZeroDivisionError/, 'Divisão por zero. Confira se o divisor pode ser 0 antes de dividir.'],
  [
    /IndexError/,
    'Você pediu uma posição que não existe na lista. Lembre: a primeira posição é 0 e a última é len(lista) - 1.',
  ],
  [/KeyError: (.+)/, 'O dicionário não tem a chave $1. Use .get(chave) para ter um valor padrão.'],
  [
    /AttributeError/,
    'Esse valor não tem o método ou atributo usado. Confira o tipo do valor e o nome do método.',
  ],
  [/ValueError/, 'O tipo está certo, mas o valor não serve, como int("abc").'],
];

export function explainPythonError(message: string): string {
  const lines = message.trimEnd().split('\n');
  const start = lines.findIndex((line) => line.includes('File "<exec>"'));
  const relevant = (start >= 0 ? lines.slice(start) : lines.slice(-3))
    .map((line) => line.replace('File "<exec>", ', ''))
    .join('\n');
  const last = lines[lines.length - 1] || '';
  for (const [pattern, text] of hints) {
    const match = last.match(pattern);
    if (match) return `${relevant}\n\n${text.replace(/\$(\d)/g, (_, group) => match[group] || '')}`;
  }
  return relevant;
}
