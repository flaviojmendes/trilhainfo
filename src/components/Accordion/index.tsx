import * as RadixAccordion from '@radix-ui/react-accordion';
import s from './Accordion.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { RoadmapItem } from '../../entity/RoadmapModel';
import { getColorFromContentType } from '../../support/contentType';
import { Checkbox } from '../Checkbox';
import { useSectionRoadmapActions } from '../HorizontalRoadmap/LevelProvider';

export const AccordionContainer = RadixAccordion.Root;
export const AccordionItem = RadixAccordion.Item;
export const AccordionHeader = RadixAccordion.Header;
export const AccordionContent = RadixAccordion.Content;

// This component is specific to the Roadmaps, if you want to use it for other
// cases, use all the separate components together as shown in this component
// structure to use the RoadmapAccordion component (both horizontal and vertical)
// <AccordionContainer>
//  {map each section to return (
//   <RoadmapAccordion /> || <HorizontalRoadmapAccordion />
//  )}
// </AccordionContainer>

type HorizontalRoadmapProps = {
  section: RoadmapItem;
};

// it's in a separate component because it uses the useSectionRoadmapActions hook
// hooks shouldn't be called conditionally
export function HorizontalRoadmapAccordion({ section }: HorizontalRoadmapProps) {
  const actions = useSectionRoadmapActions(section);

  const isRead = actions.isRead();
  const saveRead = (checked: boolean) => actions.saveRead(checked);

  return (
    <AccordionItem value={section.label} className={s.Item}>
      <AccordionHeader className={s.Header}>
        <Checkbox checked={isRead} toggleChecked={saveRead} />
        <AccordionTrigger className={s.Trigger}>
          <span>{section.label}</span>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className={s.Content}>
        {section.links?.length
          ? section.links?.map((link) => (
              <div key={link.label} className="my-2 flex items-start justify-between">
                <a
                  href={link.url}
                  target="_blank"
                  className="text-light-brown hover:underline"
                  rel="noreferrer"
                >
                  {link.label}
                </a>

                <span className={`badge  ${getColorFromContentType(link.contentType)}`}>
                  {link.contentType ? link.contentType : null}
                </span>
              </div>
            ))
          : 'Ainda não possuimos conteúdo.'}
      </AccordionContent>
    </AccordionItem>
  );
}

type AccordionProps = {
  section: RoadmapItem;
  isRead: boolean;
  saveRead: (checked: boolean) => void;
};

export function RoadmapAccordion({ section, isRead, saveRead }: AccordionProps) {
  return (
    <AccordionItem value={section.label} className={s.Item}>
      <AccordionHeader className={s.Header}>
        <Checkbox checked={isRead} toggleChecked={saveRead} />
        <AccordionTrigger className={s.Trigger}>
          <span>{section.label}</span>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className={s.Content}>
        {section.links?.length
          ? section.links?.map((link) => (
              <div key={link.label} className="my-2 flex items-start justify-between">
                <a
                  href={link.url}
                  target="_blank"
                  className="text-light-brown hover:underline"
                  rel="noreferrer"
                >
                  {link.label}
                </a>

                <span className={`badge  ${getColorFromContentType(link.contentType)}`}>
                  {link.contentType ? link.contentType : null}
                </span>
              </div>
            ))
          : 'Ainda não possuimos conteúdo.'}
      </AccordionContent>
    </AccordionItem>
  );
}

type AccordionTriggerProps = RadixAccordion.AccordionTriggerProps &
  React.RefAttributes<HTMLButtonElement> & {
    arrowDownClassName?: string;
  };

export function AccordionTrigger({
  arrowDownClassName,
  children,
  ...triggerProps
}: AccordionTriggerProps) {
  return (
    <RadixAccordion.Trigger {...triggerProps}>
      {children}
      <BsChevronDown aria-hidden className={`${s.Icon} ${arrowDownClassName}`} />
    </RadixAccordion.Trigger>
  );
}
