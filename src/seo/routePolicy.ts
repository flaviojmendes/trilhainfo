/** Personal routes stay crawlable so crawlers can read their noindex directive. */
export const isPersonalPath = (path: string) =>
  /^\/(?:profile|login|new-roadmap|edit-roadmap|course)(?:\/|$)/.test(path) ||
  /^\/roadmap\/(?:view|v)(?:\/|$)/.test(path);
