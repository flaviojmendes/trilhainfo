import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

let script: Promise<void> | undefined;

function loadScript(): Promise<void> {
  script ||= new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    element.async = true;
    element.onload = () => resolve();
    element.onerror = () => {
      script = undefined;
      reject(new Error('turnstile'));
    };
    document.head.appendChild(element);
  });
  return script;
}

export function Turnstile({
  siteKey,
  onToken,
}: {
  siteKey: string;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken);
  callback.current = onToken;

  useEffect(() => {
    let widget: string | undefined;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widget = window.turnstile.render(container.current, {
          sitekey: siteKey,
          language: 'pt-br',
          theme: 'dark',
          callback: (token: string) => callback.current(token),
          'expired-callback': () => callback.current(''),
          'error-callback': () => callback.current(''),
        });
      })
      .catch(() => callback.current(''));
    return () => {
      cancelled = true;
      if (widget) window.turnstile?.remove(widget);
    };
  }, [siteKey]);

  return <div ref={container} className="contribute-turnstile" />;
}
