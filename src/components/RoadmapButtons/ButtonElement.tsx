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
      className="p-2 text-center rounded-md bg-red font-title mr-2 hover:shadow-md hover:bg-dark-red transition-colors"
      onClick={handleAnalyticsEvent}
    >
      {text}
    </a>
  );

  const renderButton = (
    <button
      type="button"
      className="p-2 rounded-md bg-yellow font-title mr-2 hover:shadow-md hover:bg-dark-yellow transition-colors"
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
