import { useEffect, useState } from 'react';
import { Inline } from './inline';

const storageKey = (guideId: string, listId: string) =>
  `trilha-guide-checks:v1:${guideId}:${listId}`;

function read(key: string): number[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((item) => Number.isInteger(item)) : [];
  } catch {
    return [];
  }
}

export function Checklist({
  guideId,
  listId,
  items,
}: {
  guideId: string;
  listId: string;
  items: string[];
}) {
  const key = storageKey(guideId, listId);
  const [checked, setChecked] = useState<number[]>(() => read(key));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checked));
    } catch {
      /* storage can be unavailable in private mode */
    }
  }, [key, checked]);

  const toggle = (index: number) =>
    setChecked((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );

  return (
    <div className="guide-checklist">
      <div className="guide-checklist-head">
        <p role="status">
          <strong>{checked.length}</strong> de {items.length} verificados
        </p>
        {checked.length > 0 && (
          <button type="button" onClick={() => setChecked([])}>
            Recomeçar
          </button>
        )}
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(index)}
                onChange={() => toggle(index)}
              />
              <span>
                <Inline text={item} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
