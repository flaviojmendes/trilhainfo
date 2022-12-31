export type Button = "verticalView" | "horizontalView" | "download";

export type ButtonElementTypes = "link" | "button";

export type ButtonArgs = {
  text: string;
  type: ButtonElementTypes;
  category: string;
  analyticsActionTag: string;
  href?: string;
  action?: () => void;
};
