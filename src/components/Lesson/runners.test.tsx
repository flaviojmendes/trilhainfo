import { resolve } from 'path';
import { fireEvent, render, screen } from '@testing-library/react';
import { lessonStoreKey } from '../../lessons/progress';
import { LessonContext } from './context';
import { explainPythonError } from './pythonRunner';
import { Terminal } from './runners';
import { explainSqlError, loadSql, runSql } from './sqlRunner';

const stored = () => JSON.parse(localStorage.getItem(lessonStoreKey) || '{}');

describe('Terminal guiado', () => {
  beforeEach(() => localStorage.clear());

  it('aceita o comando esperado, explica o tropeço e registra a sessão', () => {
    render(
      <LessonContext.Provider value={{ lessonId: 'aula-teste' }}>
        <Terminal
          activityId="secao:0"
          block={{
            type: 'terminal',
            title: 'Primeiros comandos',
            steps: [
              {
                goal: 'Mostre a pasta atual',
                command: 'pwd',
                output: '/home/voce',
                hint: 'p de print',
              },
              {
                goal: 'Entre na pasta projeto',
                command: ['cd projeto', 'cd projeto/'],
                prompt: '~/projeto$',
              },
            ],
          }}
        />
      </LessonContext.Provider>,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'ls' } });
    fireEvent.submit(input);
    expect(
      screen.getByText(/Esse não é o comando deste passo. Dica: p de print/),
    ).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '  pwd ' } });
    fireEvent.submit(input);
    expect(screen.getByText('/home/voce')).toBeInTheDocument();
    expect(screen.getByText(/Passo 2 de 2/)).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'cd  projeto/' } });
    fireEvent.submit(screen.getByRole('textbox'));
    expect(screen.getByRole('status')).toHaveTextContent('Sessão concluída');
    expect(stored().lessons['aula-teste'].answers['secao:0']).toBe(false);
  });
});

describe('SQL ao vivo', () => {
  const locate = (file: string) => resolve(__dirname, '../../../node_modules/sql.js/dist', file);
  const setup = `CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL);
INSERT INTO produtos (nome, preco) VALUES ('Pão', 1.5), ('Café', 12), ('Leite', 6);`;

  it('roda a consulta, lista as tabelas e confere os objetivos', async () => {
    const SQL = await loadSql(locate);
    const run = runSql(SQL, setup, 'SELECT nome FROM produtos WHERE preco > 5 ORDER BY nome;', [
      'return result.rows.map(r => r[0]).join() === "Café,Leite"',
      'return run("SELECT COUNT(*) FROM produtos").rows[0][0] === 3',
      'return /order by/i.test(query)',
    ]);
    expect(run.error).toBeNull();
    expect(run.tables).toEqual([{ name: 'produtos', columns: ['id', 'nome', 'preco'] }]);
    expect(run.checks).toEqual([true, true, true]);
  });

  it('traduz erros comuns e reprova os objetivos', async () => {
    const SQL = await loadSql(locate);
    const run = runSql(SQL, setup, 'SELECT nome FROM produto', ['return true']);
    expect(run.error).toMatch(/Não existe tabela chamada "produto"/);
    expect(run.checks).toEqual([false]);
    expect(explainSqlError('near "FORM": syntax error')).toMatch(/perto de "FORM"/);
  });
});

describe('Python ao vivo', () => {
  it('mostra só a parte do erro que é do aluno, com uma explicação', () => {
    const message = `Traceback (most recent call last):
  File "/lib/python312.zip/_pyodide/_base.py", line 574, in eval_code_async
    await CodeRunner(
  File "<exec>", line 2, in <module>
NameError: name 'nome' is not defined`;
    const explained = explainPythonError(message);
    expect(explained).not.toContain('_pyodide');
    expect(explained).toContain("line 2, in <module>\nNameError: name 'nome' is not defined");
    expect(explained).toContain('O Python não conhece o nome "nome"');
  });
});
