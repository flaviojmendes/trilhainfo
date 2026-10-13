import { Contribution } from './types';

const modules = import.meta.globEager('./entries/*.json') as Record<
  string,
  { default: Contribution }
>;

export const approvedContributions: Contribution[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default);
