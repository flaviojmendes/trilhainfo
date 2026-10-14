import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { findLesson, lessonPlace } from '../../lessons';
import { lessonStoreKey, reviewStoreKey } from '../../lessons/progress';
import LessonPage from '../../pages/LessonPage';
import { buildDocument } from './Playground';
import { LessonView } from './LessonView';

function renderLesson(id = 'como-a-web-funciona') {
  const lesson = findLesson(id);
  if (!lesson) throw new Error(`Aula ausente: ${id}`);
  const place = lessonPlace(lesson.id, 'frontend');
  if (!place) throw new Error(`Aula fora dos cursos: ${id}`);
  return render(
    <MemoryRouter>
      <LessonView lesson={lesson} place={place} />
    </MemoryRouter>,
  );
}

const stored = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');

describe('Aula', () => {
  beforeEach(() => localStorage.clear());

  it('abre uma seção por vez e guarda até onde a pessoa chegou', async () => {
    renderLesson();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Como a web funciona' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /Quem pede e quem responde/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /O endereço: a URL/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Continuar: O endereço: a URL/ }));
    expect(screen.getByRole('heading', { name: /O endereço: a URL/ })).toBeInTheDocument();
    expect(stored(lessonStoreKey).lessons['como-a-web-funciona'].reached).toBe(1);
  });

  it('explica a resposta errada e registra só a primeira tentativa', async () => {
    renderLesson();
    const quiz = (await screen.findByText(/Quem é o cliente nessa conversa/)).closest(
      'section',
    ) as HTMLElement;
    fireEvent.click(within(quiz).getByRole('button', { name: /O computador do banco/ }));
    expect(within(quiz).getByRole('status')).toHaveTextContent(/Ainda não/);
    expect(within(quiz).getByRole('status')).toHaveTextContent(/servidor/);

    fireEvent.click(within(quiz).getByRole('button', { name: /O navegador do celular/ }));
    expect(within(quiz).getByRole('status')).toHaveTextContent('Agora sim.');
    const answers = stored(lessonStoreKey).lessons['como-a-web-funciona'].answers;
    expect(Object.values(answers)).toEqual([false]);
  });

  it('conclui a aula e coloca os cartões na revisão espaçada', async () => {
    renderLesson();
    await screen.findByRole('heading', { name: /Quem pede e quem responde/ });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Mostrar a aula inteira' }));
    expect(screen.getByRole('heading', { name: /Fechamento/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Concluir aula' }));

    expect(screen.getByText(/Aula concluída,|Aula concluída\./)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Próxima aula: Seu kit de trabalho/ })).toHaveAttribute(
      'href',
      '/aula/seu-kit-de-trabalho?trilha=frontend',
    );
    expect(Object.keys(stored(reviewStoreKey).cards)).toContain('como-a-web-funciona:dns');
  });

  it('indica quando a aula não existe', () => {
    render(
      <MemoryRouter initialEntries={['/aula/inexistente']}>
        <Routes>
          <Route path="/aula/:lesson" element={<LessonPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', { name: 'Esta aula não existe, ou mudou de nome' }),
    ).toBeInTheDocument();
  });
});

describe('Documento do playground', () => {
  it('impede que o código feche a própria tag de script e serializa os testes com segurança', () => {
    const html = buildDocument(
      { html: '<p>oi</p>', css: 'p{}</style><b>', js: 'console.log("</script><i>")' },
      'token',
      'check',
      ['return "</script>" !== ""'],
    );
    expect(html).not.toContain('</script><i>');
    expect(html).not.toContain('</style><b>');
    expect(html.match(/<\/script>/g)?.length).toBe(3);
  });
});
