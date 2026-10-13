import type { IncomingMessage, ServerResponse } from 'http';
import { handleContribution } from '../server/contributions';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleContribution(req, res);
}
