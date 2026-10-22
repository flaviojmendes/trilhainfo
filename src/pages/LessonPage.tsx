import { Link, useParams, useSearchParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { LessonView } from '../components/Lesson/LessonView';
import { findLesson, lessonPlace } from '../lessons';

export default function LessonPage() {
  const { lesson: id } = useParams();
  const [params] = useSearchParams();
  const lesson = findLesson(id);
  const place = lesson ? lessonPlace(lesson.id, params.get('trilha')) : undefined;

  return (
    <MainLayout>
      {lesson && place ? (
        <LessonView key={`${lesson.id}:${place.course.id}`} lesson={lesson} place={place} />
      ) : (
        <section className="site-empty">
          <p className="home-eyebrow">Aula não encontrada</p>
          <h1>Esta aula não existe, ou mudou de nome</h1>
          <p>Veja todas as aulas e continue de onde parou.</p>
          <Link className="home-button home-button-primary" to="/aulas">
            Ver todas as aulas
          </Link>
        </section>
      )}
    </MainLayout>
  );
}
