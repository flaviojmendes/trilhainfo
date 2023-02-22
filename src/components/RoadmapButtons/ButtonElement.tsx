import { ReactElement } from 'react';
import ReactGA from 'react-ga4';
import { ButtonArgs } from './types';

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
    <div className="group relative flex h-fit w-fit">
      <a
        type="button"
        href={args.href}
        className="z-20 rounded-md bg-red p-2 text-center font-title transition-colors hover:bg-dark-red hover:shadow-md"
        onClick={handleAnalyticsEvent}
      >
        {text}
      </a>
      <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-light-brown group-hover:bg-brown"></div>
    </div>
  );

  const renderButton = (
    <div className="group relative flex h-fit w-full md:w-fit">
      <button
        type="button"
        className="z-20 rounded-md bg-yellow p-2 font-title transition-colors hover:bg-dark-yellow hover:shadow-md"
        onClick={args.action}
      >
        {text}
      </button>
      <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-light-brown group-hover:bg-brown"></div>
    </div>
  );

  const buttonElements = {
    link: renderLinkButton,
    button: renderButton,
  };

  return buttonElements[type];
};

export default ButtonElement;
