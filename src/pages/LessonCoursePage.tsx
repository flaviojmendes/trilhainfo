import { PiArrowRight, PiCheckBold, PiClock } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { Review } from '../components/Lesson/Review';
import { mainRoadmapsData } from '../components/MainRoadmaps/mainRoadmapsData';
import { courseLessons, findCourse, findLesson, lessonUrl } from '../lessons';
import { lessonScore, useLessonStore } from '../lessons/progress';
import '../components/Guide/guide.css';
import '../components/Lesson/lesson.css';

export default function LessonCoursePage() {
  const { trilha } = useParams();
  const course = findCourse(trilha);
  const store = useLessonStore();

  if (!course) {
    return (
      <MainLayout>
        <section className="site-empty">
          <p className="home-eyebrow">Curso não encontrado</p>
          <h1>Esta trilha ainda não tem aulas, ou mudou de nome</h1>
          <p>Veja os cursos disponíveis e continue de onde parou.</p>
          <Link className="home-button home-button-primary" to="/aulas">
            Ver todos os cursos
          </Link>
        </section>
      </MainLayout>
    );
  }

  const ordered = courseLessons(course);
  const finished = ordered.filter((lesson) => store.lessons[lesson.id]?.done).length;
  const resume = ordered.find((lesson) => !store.lessons[lesson.id]?.done) || ordered[0];
  const started = ordered.some((lesson) => store.lessons[lesson.id]);
  const audience = mainRoadmapsData.find((roadmap) => roadmap.id === course.id)?.audience;
  let number = 0;

  return (
    <MainLayout>
      <div className="guide-page lessons-index">
        <header className="guide-hero">
          <nav className="guide-crumbs" aria-label="Você está em">
            <ol>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/aulas">Aulas</Link>
              </li>
              <li>{course.title}</li>
            </ol>
          </nav>
          <h1>{course.title} do zero, com aulas que você faz</h1>
          <p className="guide-summary">
            {audience ? `${audience} ` : ''}Cada aula explica um conceito, deixa você mexer nele e
            confere se ficou. Sem cadastro: o progresso fica no seu navegador.
          </p>
          <ul className="guide-facts">
            <li>{ordered.length} aulas</li>
            <li>
              <PiClock aria-hidden="true" /> cerca de{' '}
              {Math.max(
                1,
                Math.round(ordered.reduce((sum, lesson) => sum + lesson.minutes, 0) / 60),
              )}{' '}
              horas de aula, mais a prática
            </li>
            <li>
              {finished} de {ordered.length} concluídas
            </li>
          </ul>
          <div className="lessons-actions">
            <Link className="lesson-button" to={lessonUrl(resume.id, course.id)}>
              {started ? `Continuar: ${resume.title}` : 'Começar pela primeira aula'}
              <PiArrowRight aria-hidden="true" />
            </Link>
            <Link className="lesson-button-quiet" to={`/roadmap/${course.id}`}>
              Ver a trilha {course.title}
            </Link>
          </div>
        </header>

        <Review />

        <section aria-labelledby="modules-title">
          <h2 id="modules-title" className="lessons-modules-title">
            O caminho completo
          </h2>
          <ol className="lessons-modules">
            {course.modules.map((module) => (
              <li key={module.title}>
                <h3>
                  {module.title}
                  {module.optional && <span className="lessons-optional">Opcional</span>}
                </h3>
                <ol className="lessons-list">
                  {module.lessonIds.map((id) => {
                    const lesson = findLesson(id);
                    if (!lesson) return null;
                    number++;
                    const record = store.lessons[lesson.id];
                    const score = lessonScore(record);
                    return (
                      <li key={lesson.id} data-done={record?.done ? true : undefined}>
                        <Link to={lessonUrl(lesson.id, course.id)}>
                          <span className="lessons-number" aria-hidden="true">
                            {record?.done ? <PiCheckBold /> : String(number).padStart(2, '0')}
                          </span>
                          <span className="lessons-text">
                            <strong>{lesson.title}</strong>
                            <span>{lesson.summary}</span>
                            <small>
                              {lesson.minutes} min
                              {record?.done
                                ? ` · concluída${
                                    score.total
                                      ? `, ${score.correct}/${score.total} de primeira`
                                      : ''
                                  }`
                                : record
                                ? ' · em andamento'
                                : ''}
                            </small>
                          </span>
                          {record?.done && <span className="sr-only">, concluída</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </MainLayout>
  );
}
