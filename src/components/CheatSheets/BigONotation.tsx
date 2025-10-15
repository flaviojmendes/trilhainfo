import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Data for different Big O complexities
const linearData = Array.from({ length: 20 }, (_, i) => ({ x: i, y: i }));

const quadraticData = Array.from({ length: 20 }, (_, i) => ({ x: i, y: ((i * i) / 19) * 19 }));

const constantData = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 10 }));

const exponentialData = Array.from({ length: 20 }, (_, i) => ({ x: i, y: Math.pow(2, i / 4) }));

const logarithmicData = Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: i === 0 ? 0 : Math.log2(i + 1) * 3,
}));

export default function BigONotation() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 xl:px-16">
      <div className="rounded-sm p-8">
        {/* Header */}
        <h1 className="mb-6 text-center font-title text-5xl font-bold text-title-primary">
          Notação Big O
        </h1>

        {/* TL;DR Section */}
        <div className="mb-8 rounded-sm border-l-4 border-primary bg-box-primary p-6">
          <p className="font-title text-xl text-text-primary">
            <span className="mr-4 font-bold italic text-primary">TL;DR</span>A notação Big O
            descreve especificamente o pior cenário e pode ser usada para descrever o{' '}
            <span className="rounded bg-primary px-2 py-0.5 font-semibold text-white">tempo</span>{' '}
            de execução ou o{' '}
            <span className="rounded bg-primary px-2 py-0.5 font-semibold text-white">espaço</span>{' '}
            usado por um algoritmo.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* O(n) - Linear */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-baseline gap-2">
              <h2 className="font-title text-3xl font-bold text-primary">O(n)</h2>
              <span className="text-lg text-text-primary">complexidade linear</span>
            </div>
            <p className="mb-4 text-text-primary">
              Cresce <strong className="text-primary">linearmente</strong> conforme o tempo.
            </p>
            <div className="mb-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={linearData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#008FF6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mb-2 font-semibold text-title-primary">Exemplo:</p>
            <p className="mb-2 text-text-primary">Iterar itens dentro de um array.</p>
            <pre className="rounded-sm bg-dark-brown p-4 text-sm text-text-primary">
              <code>
                {`for(let i=0 ; i < array.length() ; i++){
  console.log(i);
}`}
              </code>
            </pre>
          </div>

          {/* O(n²) - Quadratic */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-baseline gap-2">
              <h2 className="font-title text-3xl font-bold text-primary">
                O(n<sup>2</sup>)
              </h2>
              <span className="text-lg text-text-primary">complexidade quadrática</span>
            </div>
            <p className="mb-4 text-text-primary">
              Cresce <strong className="text-primary">quadraticamente</strong> conforme a quantidade
              de entradas.
            </p>
            <div className="mb-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quadraticData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#008FF6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mb-2 font-semibold text-title-primary">Exemplo:</p>
            <p className="mb-2 text-text-primary">Um loop dentro de outro.</p>
            <pre className="rounded-sm bg-dark-brown p-4 text-sm text-text-primary">
              <code>
                {`for(let i=0 ; i < array.length() ; i++){
  for(let j=0 ; j < array.length() ; j++){
    console.log(i);
  }
}`}
              </code>
            </pre>
          </div>

          {/* O(1) - Constant */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-baseline gap-2">
              <h2 className="font-title text-3xl font-bold text-primary">O(1)</h2>
              <span className="text-lg text-text-primary">complexidade constante</span>
            </div>
            <p className="mb-4 text-text-primary">
              Independente do tamanho da entrada, a complexidade se{' '}
              <strong className="text-primary">mantém a mesma</strong>.
            </p>
            <div className="mb-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={constantData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#008FF6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mb-2 font-semibold text-title-primary">Exemplo:</p>
            <p className="mb-2 text-text-primary">Acessar uma posição de um array.</p>
            <pre className="rounded-sm bg-dark-brown p-4 text-sm text-text-primary">
              <code>
                {`const a = [10,20,30,40];
console.log(a[3]);`}
              </code>
            </pre>
          </div>

          {/* O(2^n) - Exponential */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-baseline gap-2">
              <h2 className="font-title text-3xl font-bold text-primary">
                O(2<sup>n</sup>)
              </h2>
              <span className="text-lg text-text-primary">complexidade exponencial</span>
            </div>
            <p className="mb-4 text-text-primary">
              A complexidade <strong className="text-primary">dobra</strong> a cada entrada.
            </p>
            <div className="mb-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exponentialData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#008FF6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mb-2 font-semibold text-title-primary">Exemplo:</p>
            <p className="mb-2 text-text-primary">Iterar sobre todas as combinações de um array.</p>
            <pre className="rounded-sm bg-dark-brown p-4 text-sm text-text-primary">
              <code>
                {`function fibonacci(n) {
  if(n <=1) return n;
  return fibonacci(n-2) + fibonacci(n-1);
}`}
              </code>
            </pre>
          </div>

          {/* O(log n) - Logarithmic */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-baseline gap-2">
              <h2 className="font-title text-3xl font-bold text-primary">O(log n)</h2>
              <span className="text-lg text-text-primary">complexidade logarítmica</span>
            </div>
            <p className="mb-4 text-text-primary">
              A complexidade cresce <strong className="text-primary">linearmente</strong> enquanto a
              entrada cresce <strong className="text-primary">exponencialmente</strong>.
            </p>
            <div className="mb-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={logarithmicData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#008FF6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mb-2 font-semibold text-title-primary">Exemplo:</p>
            <p className="mb-2 text-text-primary">Algoritmo que simula log 2</p>
            <pre className="rounded-sm bg-dark-brown p-4 text-sm text-text-primary">
              <code>
                {`for(let i=1; i <= n ; i=i * 2) {
  console.log(i);
}`}
              </code>
            </pre>
          </div>

          {/* Complexity Combination */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue lg:col-span-2">
            <div className="mb-4 rounded-sm bg-yellow p-4">
              <p className="font-title text-xl font-bold text-dark-brown">
                E se meu algoritmo tiver mais do que uma complexidade?
              </p>
            </div>
            <p className="mb-4 text-center font-title text-2xl font-bold text-title-primary">
              Assume-se sempre o <span className="underline decoration-primary">pior</span> caso.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 font-bold md:flex-row">
              <span className="font-title text-2xl text-text-primary">O(1) + O(n) + O(n2) =</span>
              <span className="rounded-sm bg-primary px-6 py-3 font-title text-2xl text-white">
                O(n2)
              </span>
            </div>
          </div>
        </div>

        {/* Gradient decoration */}
        <div className="mt-10 flex gap-2">
          <div className="from-transparent h-3 w-64 bg-gradient-to-r via-text-secondary to-text-secondary"></div>
          <div className="h-3 w-4 bg-gradient-to-r from-text-secondary to-primary"></div>
        </div>
      </div>
    </div>
  );
}
