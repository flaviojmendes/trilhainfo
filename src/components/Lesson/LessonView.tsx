import { useEffect, useRef, useState } from 'react';
import {
  PiArrowLeft,
  PiArrowRight,
  PiArrowUpRight,
  PiCheckBold,
  PiClock,
  PiLockSimple,
  PiTarget,
} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { activityKey, LessonPlace, lessonUrl } from '../../lessons';
import {
  cardKey,
  enrollCards,
  lessonScore,
  localDay,
  useLessonRecord,
} from '../../lessons/progress';
import { LessonContent, LessonMeta } from '../../lessons/types';
import { Checklist } from '../Guide/Checklist';
import { Inline } from '../Guide/inline';
import { LessonContext } from './context';
import { Flashcards } from './Flashcards';
import { LessonBlockView } from './LessonBlock';
import '../Guide/guide.css';
import './lesson.css';

const closingId = 'fechamento';

export function LessonView({ lesson, place }: { lesson: LessonMeta; place: LessonPlace }) {
  const [content, setContent] = useState<LessonContent | null>(null);
  const [failed, setFailed] = useState(false);
  const [record, update] = useLessonRecord(lesson.id);
  const [showAll, setShowAll] = useState(false);
  const focusTarget = useRef<string>();
  const { course, previous, next } = place;
  const trailGroup = course.groups[lesson.id] || lesson.groupIds[0];

  useEffect(() => {
    let current = true;
    lesson
      .load()
      .then((module) => current && setContent(module.content))
      .catch(() => current && setFailed(true));
    return () => {
      current = false;
    };
  }, [lesson]);

  const sections = content?.sections || [];
  const total = sections.length + 1;
  const reached = Math.min(record?.reached ?? 0, total - 1);
  const visible = showAll || record?.done ? total : reached + 1;
  const done = !!record?.done;
  const score = lessonScore(record);
  const percent = done ? 100 : Math.round((reached / total) * 100);
  const ids = [...sections.map((section) => section.id), closingId];

  useEffect(() => {
    const target = focusTarget.current;
    if (!target) return;
    focusTarget.current = undefined;
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById(`${target}-title`);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView?.({
        block: 'start',
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [visible, reached]);

  function open(index: number) {
    focusTarget.current = ids[index];
    update((previous) => ({ ...previous, reached: Math.max(previous.reached, index) }));
    if (index < visible) {
      focusTarget.current = undefined;
      document.getElementById(`${ids[index]}-title`)?.focus();
      document.getElementById(ids[index])?.scrollIntoView?.({ block: 'start' });
    }
  }

  function complete() {
    if (!content) return;
    update((previous) => ({ ...previous, reached: total - 1, done: previous.done || localDay() }));
    enrollCards(content.cards.map((card) => cardKey(lesson.id, card.id)));
  }

  return (
    <LessonContext.Provider value={{ lessonId: lesson.id }}>
      <article className="guide-page lesson-page" aria-labelledby="lesson-title">
        <header className="guide-hero lesson-hero">
          <nav className="guide-crumbs" aria-label="Você está em">
            <ol>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to={`/aulas/${course.id}`}>Aulas de {course.title}</Link>
              </li>
              <li>{place.module.title}</li>
            </ol>
          </nav>
          <p className="lesson-number">
            Aula {place.number} de {place.total} · {course.title}
          </p>
          <h1 id="lesson-title">{lesson.title}</h1>
          <p className="guide-summary">{lesson.summary}</p>
          <ul className="guide-facts">
            <li>
              <PiClock aria-hidden="true" /> cerca de {lesson.minutes} min
            </li>
            <li>Para quem está começando</li>
            <li>Progresso salvo neste navegador</li>
          </ul>
          <div className="lesson-objectives">
            <p>
              <PiTarget aria-hidden="true" /> Ao final, você vai conseguir:
            </p>
            <ul>
              {lesson.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </div>
          <div className="lesson-progress">
            <div className="lesson-progress-bar" aria-hidden="true">
              <span style={{ width: `${percent}%` }} />
            </div>
            <p>
              {done ? 'Aula concluída' : `${percent}% da aula`}
              {score.total > 0 &&
                ` · ${score.correct} de ${score.total} atividades certas de primeira`}
            </p>
            <progress
              className="sr-only"
              max={100}
              value={percent}
              aria-label="Progresso na aula"
            />
          </div>
        </header>

        <div className="guide-layout">
          <nav className="guide-toc lesson-toc" aria-label="Nesta aula">
            <p className="guide-toc-title" aria-hidden="true">
              Nesta aula
            </p>
            {content && (
              <ol>
                {ids.map((id, index) => {
                  const title = index < sections.length ? sections[index].title : 'Fechamento';
                  const locked = index >= visible;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        data-locked={locked || undefined}
                        data-done={index < reached || done || undefined}
                        aria-current={
                          index === Math.min(reached, visible - 1) && !done ? 'step' : undefined
                        }
                        onClick={(event) => {
                          event.preventDefault();
                          open(index);
                        }}
                      >
                        <span aria-hidden="true">
                          {index < reached || done ? (
                            <PiCheckBold />
                          ) : locked ? (
                            <PiLockSimple />
                          ) : (
                            String(index + 1).padStart(2, '0')
                          )}
                        </span>
                        {title}
                        {locked && <span className="sr-only"> (ainda não aberta)</span>}
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
            {!done && (
              <label className="option-check lesson-show-all">
                <input
                  type="checkbox"
                  checked={showAll}
                  onChange={(event) => setShowAll(event.target.checked)}
                />
                Mostrar a aula inteira
              </label>
            )}
          </nav>

          <div className="guide-body lesson-body">
            {failed ? (
              <div className="guide-failed" role="alert">
                <p>Não foi possível carregar esta aula. Verifique a conexão e tente de novo.</p>
                <button type="button" onClick={() => window.location.reload()}>
                  Recarregar
                </button>
              </div>
            ) : !content ? (
              <div role="status" aria-label="Carregando aula">
                <div className="roadmap-skeleton" />
                <div className="roadmap-skeleton" />
              </div>
            ) : (
              <>
                <p className="lesson-hook">
                  <Inline text={content.hook} />
                </p>
                {sections.slice(0, visible).map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="guide-section lesson-section"
                    aria-labelledby={`${section.id}-title`}
                  >
                    <h2 id={`${section.id}-title`} tabIndex={-1}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      {section.title}
                    </h2>
                    {section.blocks.map((block, blockIndex) => (
                      <LessonBlockView
                        key={blockIndex}
                        block={block}
                        lessonId={lesson.id}
                        activityId={activityKey(section.id, blockIndex)}
                      />
                    ))}
                    {index === visible - 1 && (
                      <div className="lesson-continue">
                        <button
                          type="button"
                          className="lesson-button"
                          onClick={() => open(index + 1)}
                        >
                          {index + 1 < sections.length
                            ? `Continuar: ${sections[index + 1].title}`
                            : 'Ir para o fechamento'}
                          <PiArrowRight aria-hidden="true" />
                        </button>
                        <span>
                          Seção {index + 1} de {sections.length}
                        </span>
                      </div>
                    )}
                  </section>
                ))}
                {visible === total && (
                  <section
                    id={closingId}
                    className="guide-section lesson-section lesson-closing"
                    aria-labelledby={`${closingId}-title`}
                  >
                    <h2 id={`${closingId}-title`} tabIndex={-1}>
                      <span aria-hidden="true">{String(total).padStart(2, '0')}</span>
                      Fechamento
                    </h2>
                    <div className="lesson-recap">
                      <h3>O que levar desta aula</h3>
                      <ul className="guide-list">
                        {content.recap.map((item) => (
                          <li key={item}>
                            <Inline text={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    {content.cards.length > 0 && (
                      <div className="lesson-recall">
                        <h3>Teste sua memória</h3>
                        <p className="guide-text">
                          Lembrar sem olhar fixa o conteúdo muito mais do que reler. Responda de
                          cabeça antes de virar cada cartão. Ao concluir a aula, eles entram na sua{' '}
                          <Link to="/aulas#revisao">revisão espaçada</Link>.
                        </p>
                        <Flashcards
                          cards={content.cards.map((card) => ({
                            key: cardKey(lesson.id, card.id),
                            front: card.front,
                            back: card.back,
                          }))}
                        />
                      </div>
                    )}
                    <div className="lesson-mission">
                      <p className="lesson-activity-kind">Missão fora da aula</p>
                      <h3>
                        <Inline text={content.mission.title} />
                      </h3>
                      <p className="guide-text">
                        <Inline text={content.mission.text} />
                      </p>
                      <Checklist
                        guideId={`aula-${lesson.id}`}
                        listId="missao"
                        items={content.mission.steps}
                      />
                      <Link
                        className="lesson-trail-link"
                        to={`/roadmap/${course.id}#${encodeURIComponent(trailGroup)}`}
                      >
                        Registrar a prática na trilha {course.title}{' '}
                        <PiArrowUpRight aria-hidden="true" />
                      </Link>
                    </div>
                    <div className="lesson-complete" data-done={done || undefined}>
                      {done ? (
                        <p role="status">
                          <PiCheckBold aria-hidden="true" /> Aula concluída
                          {score.total > 0 &&
                            `, com ${score.correct} de ${score.total} atividades certas de primeira`}
                          .{next && ' Quando quiser, siga para a próxima.'}
                        </p>
                      ) : (
                        <button type="button" className="lesson-button" onClick={complete}>
                          <PiCheckBold aria-hidden="true" /> Concluir aula
                        </button>
                      )}
                      {done && next && (
                        <Link className="lesson-button" to={lessonUrl(next.id, course.id)}>
                          Próxima aula: {next.title} <PiArrowRight aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </section>
                )}
                {content.sources && content.sources.length > 0 && visible === total && (
                  <section className="guide-sources" aria-labelledby="lesson-sources-title">
                    <h2 id="lesson-sources-title">Para ir além</h2>
                    <p className="guide-text">
                      Referências externas para aprofundar. A aula acima já cobre o essencial.
                    </p>
                    <ul>
                      {content.sources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} target="_blank" rel="noreferrer">
                            {source.title}
                            <PiArrowUpRight aria-hidden="true" />
                            <span className="sr-only"> (abre em nova aba)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>
        </div>

        <footer className="guide-end">
          <nav className="guide-pager" aria-label="Aula anterior e próxima">
            {previous ? (
              <Link to={lessonUrl(previous.id, course.id)} rel="prev">
                <PiArrowLeft aria-hidden="true" />
                <span>
                  <small>Aula anterior</small>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={lessonUrl(next.id, course.id)} rel="next" className="guide-pager-next">
                <span>
                  <small>Próxima aula</small>
                  {next.title}
                </span>
                <PiArrowRight aria-hidden="true" />
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </LessonContext.Provider>
  );
}
