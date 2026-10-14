import { useState } from 'react';
import { PiCards } from 'react-icons/pi';
import { findLesson } from '../../lessons';
import { dueCardKeys, useReviewStore } from '../../lessons/progress';
import { DeckCard, Flashcards } from './Flashcards';

async function loadDeck(keys: string[]): Promise<DeckCard[]> {
  const byLesson = new Map<string, string[]>();
  keys.forEach((key) => {
    const [lessonId, cardId] = [key.slice(0, key.indexOf(':')), key.slice(key.indexOf(':') + 1)];
    byLesson.set(lessonId, [...(byLesson.get(lessonId) || []), cardId]);
  });
  const decks = await Promise.all(
    [...byLesson].map(async ([lessonId, cardIds]) => {
      const lesson = findLesson(lessonId);
      if (!lesson) return [];
      const { content } = await lesson.load();
      return content.cards
        .filter((card) => cardIds.includes(card.id))
        .map((card) => ({
          key: `${lessonId}:${card.id}`,
          front: card.front,
          back: card.back,
          source: lesson.title,
        }));
    }),
  );
  return decks.flat();
}

export function Review() {
  const review = useReviewStore();
  const due = dueCardKeys(review);
  const total = Object.keys(review.cards).length;
  const [deck, setDeck] = useState<DeckCard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <section id="revisao" className="lessons-review" aria-labelledby="review-title">
      <PiCards aria-hidden="true" className="lessons-review-icon" />
      <div>
        <h2 id="review-title">Revisão de hoje</h2>
        {deck ? (
          <Flashcards cards={deck} />
        ) : total === 0 ? (
          <p>
            Ao concluir uma aula, os cartões dela entram aqui e voltam em intervalos crescentes: um
            dia, três, uma semana. Revisar no momento em que você está quase esquecendo é o que faz
            a memória durar.
          </p>
        ) : due.length === 0 ? (
          <p>
            Nada para revisar hoje. Você tem {total} {total === 1 ? 'cartão' : 'cartões'} no
            baralho; eles voltam quando for a hora.
          </p>
        ) : (
          <>
            <p>
              {due.length} {due.length === 1 ? 'cartão pronto' : 'cartões prontos'} para revisar.
              Leva poucos minutos.
            </p>
            <button
              type="button"
              className="lesson-button"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                setFailed(false);
                try {
                  setDeck(await loadDeck(due));
                } catch {
                  setFailed(true);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? 'Preparando cartões…' : 'Começar revisão'}
            </button>
            {failed && <p role="alert">Não foi possível carregar os cartões. Tente de novo.</p>}
          </>
        )}
      </div>
    </section>
  );
}
