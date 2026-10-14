import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PiArrowsClockwise, PiCheckBold } from 'react-icons/pi';
import { rateCard } from '../../lessons/progress';
import { Inline } from '../Guide/inline';

export interface DeckCard {
  key: string;
  front: string;
  back: string;
  source?: string;
}

export function Flashcards({ cards, onFinish }: { cards: DeckCard[]; onFinish?: () => void }) {
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [remembered, setRemembered] = useState(0);
  const reduced = useReducedMotion();
  const card = queue[0];

  function answer(value: boolean) {
    rateCard(card.key, value);
    if (value) setRemembered((count) => count + 1);
    const rest = queue.slice(1);
    const next = value ? rest : [...rest, card];
    setQueue(next);
    setFlipped(false);
    if (!next.length) onFinish?.();
  }

  if (!cards.length) return null;
  if (!card)
    return (
      <div className="lesson-deck-done" role="status">
        <PiCheckBold aria-hidden="true" />
        <p>
          <strong>Revisão concluída.</strong> {remembered} de {cards.length} cartões lembrados de
          primeira. Os que você lembrou voltam em alguns dias; os outros, amanhã.
        </p>
        <button
          type="button"
          className="lesson-button-quiet"
          onClick={() => {
            setQueue(cards);
            setRemembered(0);
          }}
        >
          <PiArrowsClockwise aria-hidden="true" /> Revisar de novo
        </button>
      </div>
    );

  return (
    <div className="lesson-deck">
      <p className="lesson-deck-count" aria-live="polite">
        {queue.length} {queue.length === 1 ? 'cartão restante' : 'cartões restantes'}
      </p>
      <motion.div
        key={card.key + String(flipped)}
        className="lesson-card"
        data-flipped={flipped || undefined}
        initial={reduced ? false : { rotateX: flipped ? -70 : 0, opacity: flipped ? 0.4 : 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {card.source && <p className="lesson-card-source">{card.source}</p>}
        <p className="lesson-card-side">{flipped ? 'Resposta' : 'Pergunta'}</p>
        <p className="lesson-card-text">
          <Inline text={flipped ? card.back : card.front} />
        </p>
      </motion.div>
      <div className="lesson-deck-actions">
        {!flipped ? (
          <button type="button" className="lesson-button" onClick={() => setFlipped(true)}>
            Tente lembrar, depois mostre a resposta
          </button>
        ) : (
          <>
            <button type="button" className="lesson-button-quiet" onClick={() => answer(false)}>
              Ainda não lembrei
            </button>
            <button type="button" className="lesson-button" onClick={() => answer(true)}>
              Lembrei
            </button>
          </>
        )}
      </div>
    </div>
  );
}
