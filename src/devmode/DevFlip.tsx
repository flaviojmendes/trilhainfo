import * as Dialog from '@radix-ui/react-dialog';
import {
  Component,
  lazy,
  ReactNode,
  Suspense,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { PanelProps } from './DevPanel';
import { useDevMode } from './state';
import { DevComponentId, devTitles } from './titles';
import './devmode.css';

const DevPanel = lazy(() => import('./DevPanel'));

interface Props {
  id: DevComponentId;
  label?: string;
  data?: unknown;
  variant?: 'flip' | 'dialog';
  children: ReactNode;
}

const fullName = (id: DevComponentId, label?: string) =>
  label ? `${devTitles[id]}: ${label}` : devTitles[id];

function Loading() {
  return (
    <p className="dev-loading" role="status">
      Carregando o código…
    </p>
  );
}

class PanelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <p className="dev-loading" role="alert">
        Não foi possível carregar o painel. Recarregue a página e tente de novo.
      </p>
    ) : (
      this.props.children
    );
  }
}

function Panel(props: PanelProps) {
  return (
    <PanelBoundary>
      <Suspense fallback={<Loading />}>
        <DevPanel {...props} />
      </Suspense>
    </PanelBoundary>
  );
}

function PanelDialog({
  open,
  onOpenChange,
  trigger,
  ...panel
}: Omit<Props, 'children' | 'variant'> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger}
      <Dialog.Portal>
        <Dialog.Overlay className="dev-dialog-overlay" />
        <Dialog.Content className="dev-dialog" aria-describedby={undefined}>
          <Dialog.Close className="dev-dialog-close">
            Fechar<span className="sr-only"> o código de {fullName(panel.id, panel.label)}</span>
          </Dialog.Close>
          <Panel {...panel} active inDialog />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CardFlip({ id, label, data, children }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const backId = useId();

  // Layout effect: the panel focuses its heading in a passive effect, which needs the back face live.
  useLayoutEffect(() => {
    if (front.current) front.current.inert = flipped;
    if (back.current) back.current.inert = !flipped;
  }, [flipped, mounted]);

  function flip(next: boolean) {
    if (next && root.current && front.current) {
      const limit = Math.min(window.innerHeight * 0.85, 720);
      const height = Math.min(Math.max(front.current.offsetHeight, 420), limit);
      root.current.style.setProperty('--dev-h', `${Math.round(height)}px`);
      setMounted(true);
    }
    setFlipped(next);
  }

  useEffect(() => {
    const face = back.current;
    if (!face || !flipped || expanded) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      setFlipped(false);
      toggle.current?.focus();
    }
    face.addEventListener('keydown', onKeyDown);
    return () => face.removeEventListener('keydown', onKeyDown);
  }, [flipped, expanded]);

  return (
    <div ref={root} className="dev-flip" data-flipped={flipped ? '' : undefined}>
      <button
        ref={toggle}
        type="button"
        className="dev-flip-toggle"
        aria-expanded={flipped}
        aria-controls={backId}
        onClick={() => flip(!flipped)}
      >
        <span aria-hidden="true">{flipped ? '↩' : '</>'}</span>
        {flipped ? 'Voltar' : 'Código'}
        <span className="sr-only">
          {flipped ? ' para ' : ' de '}
          {fullName(id, label)}
        </span>
      </button>
      <div className="dev-flip-inner">
        <div ref={front} className="dev-flip-face dev-flip-front">
          {children}
        </div>
        <div ref={back} id={backId} className="dev-flip-face dev-flip-back">
          {mounted && (
            <Panel
              id={id}
              label={label}
              data={data}
              active={flipped && !expanded}
              onExpand={() => setExpanded(true)}
            />
          )}
        </div>
      </div>
      {mounted && (
        <PanelDialog id={id} label={label} data={data} open={expanded} onOpenChange={setExpanded} />
      )}
    </div>
  );
}

function DialogFlip({ id, label, data, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dev-flip dev-flip-dialog">
      {children}
      <PanelDialog
        id={id}
        label={label}
        data={data}
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Dialog.Trigger className="dev-flip-toggle dev-flip-toggle-hang">
            <span aria-hidden="true">{'</>'}</span>
            Código<span className="sr-only"> de {fullName(id, label)}</span>
          </Dialog.Trigger>
        }
      />
    </div>
  );
}

/** In developer mode, lets a component flip to show its own source, styles, requests and data. */
export function DevFlip(props: Props) {
  const enabled = useDevMode();
  if (!enabled) return <>{props.children}</>;
  return props.variant === 'dialog' ? <DialogFlip {...props} /> : <CardFlip {...props} />;
}
