export type Button = 'verticalView' | 'horizontalView' | 'download' | 'exportNotes';

export type ButtonElementTypes = 'link' | 'button';

export type ButtonArgs = {
  text: string;
  type: ButtonElementTypes;
  category: string;
  analyticsActionTag: string;
  shouldAuthenticate?: boolean;
  href?: string;
  action?: () => void;
};
