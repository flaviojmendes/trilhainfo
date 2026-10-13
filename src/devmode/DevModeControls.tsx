import { setDevMode, useDevMode } from './state';
import './devmode.css';

// Toggling the mode re-wraps the footer, so the button is a new element afterwards.
function refocusToggle() {
  requestAnimationFrame(() => {
    const toggle = document.querySelector<HTMLElement>('.site-dev-toggle');
    (toggle || document.getElementById('main-content'))?.focus();
  });
}

export function DevModeToggle() {
  const enabled = useDevMode();
  return (
    <button
      type="button"
      className="site-dev-toggle"
      aria-pressed={enabled}
      title={enabled ? 'Desligar o modo desenvolvedor' : 'Modo desenvolvedor'}
      onClick={() => {
        setDevMode(!enabled);
        refocusToggle();
      }}
    >
      <span aria-hidden="true">{'</>'}</span>
      <span className="sr-only">Modo desenvolvedor</span>
    </button>
  );
}

export function DevModeBar() {
  const enabled = useDevMode();
  return (
    <>
      <p className="sr-only" role="status">
        {enabled
          ? 'Modo desenvolvedor ligado. Use o botão Código acima de cada componente para ver como ele é feito.'
          : ''}
      </p>
      {enabled && (
        <aside className="dev-bar" aria-label="Modo desenvolvedor">
          <p>
            <span className="dev-bar-mark" aria-hidden="true">
              {'</>'}
            </span>
            Modo desenvolvedor
          </p>
          <button
            type="button"
            onClick={() => {
              setDevMode(false);
              refocusToggle();
            }}
          >
            Sair<span className="sr-only"> do modo desenvolvedor</span>
          </button>
        </aside>
      )}
    </>
  );
}
