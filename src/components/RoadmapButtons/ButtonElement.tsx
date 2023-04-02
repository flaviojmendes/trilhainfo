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
        className="z-20 rounded-md border-2 border-dark-brown bg-red p-2 text-center font-title shadow-brutalist-light  transition-all duration-300 hover:bg-dark-red hover:shadow-brutalist-light-hover"
        onClick={handleAnalyticsEvent}
      >
        {text}
      </a>
    </div>
  );

  const renderButton = (
    <div className="group relative flex h-fit w-fit">
      <button
        type="button"
        className="z-20 rounded-md border-2 border-dark-brown bg-yellow p-2 font-title shadow-brutalist-light transition-all duration-300 hover:bg-dark-yellow hover:shadow-brutalist-light-hover"
        onClick={args.action}
      >
        {text}
      </button>
    </div>
  );

  const buttonElements = {
    link: renderLinkButton,
    button: renderButton,
  };

  return buttonElements[type];
};

export default ButtonElement;
