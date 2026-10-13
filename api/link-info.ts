import type { IncomingMessage, ServerResponse } from 'http';
import { handleLinkInfo } from '../server/contributions';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleLinkInfo(req, res);
}
