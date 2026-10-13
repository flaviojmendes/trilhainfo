import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { extractRules } from './cssRules';
import { DevFlip } from './DevFlip';
import { toDisplayJSON } from './json';
import {
  clearNetwork,
  installNetworkRecorder,
  isRecording,
  networkEntries,
  redact,
  uninstallNetworkRecorder,
} from './network';
import { isDevMode, setDevMode } from './state';

describe('extractRules', () => {
  const css = [
    '/* .card in a comment */',
    '.card { color: red; }',
    '.other { content: ".card"; }',
    '@media (max-width: 640px) {',
    '  .card, .x { padding: 0; }',
    '  .y { margin: 0; }',
    '}',
    '@keyframes card { from { opacity: 0; } }',
  ].join('\n');

  it('returns matching rules with their line numbers and media wrappers', () => {
    const rules = extractRules(css, ['.card']);
    expect(rules.map((rule) => rule.line)).toEqual([2, 5]);
    expect(rules[0].text).toBe('.card { color: red; }');
    expect(rules[1].text).toContain('@media (max-width: 640px)');
    expect(rules[1].text).toContain('.card, .x { padding: 0; }');
    expect(rules[1].text).not.toContain('.y');
  });
});

describe('toDisplayJSON', () => {
  it('marks cycles but keeps shared references', () => {
    const shared = { id: 1 };
    const cyclic: Record<string, unknown> = { name: 'raiz', a: shared, b: shared };
    cyclic.self = cyclic;
    const parsed = JSON.parse(toDisplayJSON(cyclic));
    expect(parsed.a).toEqual({ id: 1 });
    expect(parsed.b).toEqual({ id: 1 });
    expect(parsed.self).toBe('[referência circular]');
  });

  it('shows functions and React elements without walking into them', () => {
    const parsed = JSON.parse(
      toDisplayJSON({
        load: function load() {
          return undefined;
        },
        icon: <span />,
      }),
    );
    expect(parsed).toEqual({ load: 'ƒ load()', icon: '[elemento React]' });
  });
});

describe('network recorder', () => {
  const realFetch = window.fetch;

  afterEach(() => {
    uninstallNetworkRecorder();
    window.fetch = realFetch;
    clearNetwork();
  });

  it('records requests and redacts secrets', async () => {
    window.fetch = vi.fn(
      async () =>
        new Response('{"ok":true,"token":"abc"}', {
          status: 201,
          headers: { 'content-type': 'application/json' },
        }),
    );
    installNetworkRecorder();
    await fetch('/api/contributions', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://x.dev', turnstileToken: 'segredo' }),
    });
    await waitFor(() => expect(networkEntries()[0]?.responseBody).toBeDefined());
    const [entry] = networkEntries();
    expect(entry.method).toBe('POST');
    expect(entry.url).toMatch(/\/api\/contributions$/);
    expect(entry.status).toBe(201);
    expect(entry.requestBody).toContain('[oculto]');
    expect(entry.requestBody).not.toContain('segredo');
    expect(entry.responseBody).not.toContain('abc');
  });

  it('restores the original fetch', () => {
    const base = vi.fn();
    window.fetch = base;
    installNetworkRecorder();
    expect(window.fetch).not.toBe(base);
    uninstallNetworkRecorder();
    expect(window.fetch).toBe(base);
  });

  it('leaves non-JSON bodies alone', () => {
    expect(redact('token=abc')).toBe('token=abc');
  });
});

describe('developer mode', () => {
  afterEach(() => act(() => setDevMode(false)));

  it('persists the choice and records only while on', () => {
    act(() => setDevMode(true));
    expect(isDevMode()).toBe(true);
    expect(localStorage.getItem('trilha:dev-mode')).toBe('1');
    expect(isRecording()).toBe(true);
    act(() => setDevMode(false));
    expect(localStorage.getItem('trilha:dev-mode')).toBeNull();
    expect(isRecording()).toBe(false);
  });

  it('renders only the component while off', () => {
    const { container } = render(
      <DevFlip id="guide-card" label="HTTP">
        <a href="/guide/http">HTTP</a>
      </DevFlip>,
    );
    expect(container.innerHTML).toBe('<a href="/guide/http">HTTP</a>');
  });

  it('flips to the code panel and back', async () => {
    act(() => setDevMode(true));
    render(
      <DevFlip id="guide-card" label="HTTP" data={{ id: 'http' }}>
        <a href="/guide/http">HTTP</a>
      </DevFlip>,
    );
    const toggle = screen.getByRole('button', { name: 'Código de Card de guia: HTTP' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const front = screen.getByRole('link', { name: 'HTTP' }).closest('.dev-flip-front');
    expect((front as HTMLElement).inert).toBe(true);

    const heading = await screen.findByRole('heading', { name: /Card de guia/ });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(screen.getByRole('tab', { name: 'Como funciona' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Como funciona' }), { key: 'End' });
    expect(screen.getByRole('tab', { name: 'Dados' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('region', { name: 'Dados do componente' })).toHaveTextContent('"http"');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Dados' }), { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
    expect((front as HTMLElement).inert).toBe(false);
  });
});
