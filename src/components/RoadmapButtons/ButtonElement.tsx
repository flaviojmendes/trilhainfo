import { ReactElement } from "react";
import ReactGA from "react-ga4";
import { ButtonArgs } from "./types";

type ButtonElementProps = ButtonArgs;

const ButtonElement = ({
  type,
  category,
  analyticsActionTag,
  text,
  ...args
}: ButtonElementProps): ReactElement => {
  function handleAnalyticsEvent() {
    ReactGA.event({
      category,
      action: analyticsActionTag,
    });
  }

  const renderLinkButton = (
    <a
      type="button"
      href={args.href}
      className="border-2 p-1 rounded-md bg-light-orange font-title border-red mr-2 hover:shadow-md hover:bg-red hover:border-light-orange transition-colors"
      onClick={handleAnalyticsEvent}
    >
      {text}
    </a>
  );

  const renderButton = (
    <button
      type="button"
      className="border-2 p-1 rounded-md bg-yellow font-title border-light-yellow mr-2 hover:shadow-md hover:bg-light-yellow hover:border-yellow transition-colors"
      onClick={args.action}
    >
      {text}
    </button>
  );

  const buttonElements = {
    link: renderLinkButton,
    button: renderButton,
  };

  return buttonElements[type];
};

export default ButtonElement;
