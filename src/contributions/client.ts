import { Contribution } from './types';
import { FieldErrors } from './validate';

export type SubmitResult =
  | { status: 'sent'; pull: { number: number; url: string } }
  | { status: 'dry-run'; path: string; file: Contribution }
  | { status: 'duplicate'; message: string; pull: { number: number; url: string } }
  | { status: 'invalid'; message: string; errors: FieldErrors }
  | { status: 'failed'; message: string };

export async function submitContribution(payload: unknown): Promise<SubmitResult> {
  let response: Response;
  try {
    response = await fetch('/api/contributions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return { status: 'failed', message: 'Sem conexão. Confira a internet e tente de novo.' };
  }
  const body = await response.json().catch(() => ({}));
  if (response.status === 201) return { status: 'sent', pull: body.pull };
  if (response.ok && body.dryRun) return { status: 'dry-run', path: body.path, file: body.file };
  if (response.status === 409 && body.pull)
    return { status: 'duplicate', message: body.error, pull: body.pull };
  if (response.status === 422 && body.errors)
    return { status: 'invalid', message: body.error, errors: body.errors };
  return {
    status: 'failed',
    message: body.error || 'Não foi possível enviar agora. Tente de novo em alguns minutos.',
  };
}

export async function fetchLinkInfo(
  url: string,
): Promise<{ title: string; kind: 'video' } | undefined> {
  try {
    const response = await fetch(`/api/link-info?url=${encodeURIComponent(url)}`);
    if (!response.ok) return undefined;
    const body = await response.json();
    return body.title ? { title: body.title, kind: 'video' } : undefined;
  } catch {
    return undefined;
  }
}
