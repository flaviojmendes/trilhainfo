import { CSSProperties } from 'react';
import { PiArrowRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { Review } from '../components/Lesson/Review';
import { mainRoadmapsData } from '../components/MainRoadmaps/mainRoadmapsData';
import { courseLessons, courses, lessons } from '../lessons';
import { useLessonStore } from '../lessons/progress';
import '../components/Guide/guide.css';
import '../components/Lesson/lesson.css';

const method = [
  {
    title: 'Entenda',
    text: 'Explicações curtas, com analogias do dia a dia e animações que mostram o que acontece por dentro.',
  },
  {
    title: 'Experimente',
    text: 'Código, SQL, Python e terminal ao vivo: mude e veja o resultado na hora, sem instalar nada.',
  },
  {
    title: 'Verifique',
    text: 'Perguntas que explicam o erro, não só apontam. Errar aqui é parte do método.',
  },
  {
    title: 'Lembre',
    text: 'Cartões de revisão voltam no dia certo para o conhecimento ficar, não só passar.',
  },
];

const order = mainRoadmapsData.map((roadmap) => roadmap.id as string);

export default function LessonsPage() {
  const store = useLessonStore();
  const sorted = [...courses].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return (
    <MainLayout>
      <div className="guide-page lessons-index">
        <header className="guide-hero">
          <nav className="guide-crumbs" aria-label="Você está em">
            <ol>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>Aulas</li>
            </ol>
          </nav>
          <h1>Aulas que você faz, para cada trilha</h1>
          <p className="guide-summary">
            Cursos gratuitos para quem está começando do zero. Cada aula explica um conceito, deixa
            você mexer nele e confere se ficou. Sem cadastro: o progresso fica no seu navegador.
          </p>
          <ul className="guide-facts">
            <li>{lessons.length} aulas</li>
            <li>{courses.length} cursos</li>
            <li>Aulas em comum aparecem em mais de uma trilha, e o progresso vale para todas</li>
          </ul>
        </header>

        <section aria-labelledby="method-title" className="lessons-method">
          <h2 id="method-title">Como as aulas ensinam</h2>
          <ol>
            {method.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <Review />

        <section aria-labelledby="courses-title">
          <h2 id="courses-title" className="lessons-modules-title">
            Escolha um curso
          </h2>
          <ul className="lessons-courses">
            {sorted.map((course) => {
              const ordered = courseLessons(course);
              const done = ordered.filter((lesson) => store.lessons[lesson.id]?.done).length;
              const minutes = ordered.reduce((sum, lesson) => sum + lesson.minutes, 0);
              const roadmap = mainRoadmapsData.find((value) => value.id === course.id);
              return (
                <li key={course.id}>
                  <Link to={`/aulas/${course.id}`}>
                    <span className="lessons-course-kind">{roadmap?.kind || 'Trilha'}</span>
                    <strong>{course.title}</strong>
                    {roadmap?.audience && <span>{roadmap.audience}</span>}
                    <span
                      className="lessons-course-meter"
                      style={{ '--p': ordered.length ? done / ordered.length : 0 } as CSSProperties}
                      aria-hidden="true"
                    >
                      <span />
                    </span>
                    <small>
                      {ordered.length} aulas · cerca de {Math.max(1, Math.round(minutes / 60))} h
                      {done > 0 ? ` · ${done} concluídas` : ''}
                    </small>
                    <span className="lessons-course-cta">
                      {done > 0 ? 'Continuar' : 'Ver o curso'} <PiArrowRight aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </MainLayout>
  );
}
