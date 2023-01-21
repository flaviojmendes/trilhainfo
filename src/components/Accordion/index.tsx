import * as RadixAccordion from '@radix-ui/react-accordion';
import s from './Accordion.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { RoadmapItem } from '../../entity/RoadmapModel';
import { getColorFromContentType } from '../../support/contentType';
import { Checkbox } from '../Checkbox';
import { useSectionRoadmapActions } from '../HorizontalRoadmap/LevelProvider/LevelProvider';
export const AccordionContainer = RadixAccordion.Root;

type AccordionProps =
  | {
      section: RoadmapItem;
      isHorizontalPage: true;
    }
  | {
      section: RoadmapItem;
      isHorizontalPage?: false;
      activeItemLabel: string;
      isRead: (label: string) => boolean;
      saveRead: (label: string, checked: boolean) => void;
    };

// This component is specific to the Roadmaps, if you want to use it for other
// cases, use all the separate components together as shown in this component
export function RoadmapAccordion(props: AccordionProps) {
  let key: string;
  let isRead: boolean;
  let saveRead: (check: boolean) => void;

  if (props.isHorizontalPage) {
    const actions = useSectionRoadmapActions(props.section);

    isRead = actions.isRead();
    saveRead = (checked: boolean) => actions.saveRead(checked);
  } else {
    key = props.section.label + '-' + props.activeItemLabel;
    isRead = props.isRead(key);
    saveRead = (checked: boolean) => props.saveRead(key, checked);
  }

  return (
    <AccordionItem value={props.section.label} className={s.Item}>
      <AccordionHeader className={s.Header}>
        <Checkbox checked={isRead} toggleChecked={saveRead} />
        <AccordionTrigger className={s.Trigger}>
          <span>{props.section.label}</span>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className={s.Content}>
        {props.section.links?.length
          ? props.section.links?.map((link) => (
              <div className="flex my-2 justify-between items-start">
                <a
                  href={link.url}
                  target="_blank"
                  className="text-light-brown hover:underline"
                >
                  {link.label}
                </a>

                <span
                  className={`badge  ${getColorFromContentType(
                    link.contentType
                  )}`}
                >
                  {link.contentType ? link.contentType : null}
                </span>
              </div>
            ))
          : 'Ainda não possuimos conteúdo.'}
      </AccordionContent>
    </AccordionItem>
  );
}

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <RadixAccordion.Item value={value} className={className}>
      {children}
    </RadixAccordion.Item>
  );
}

export function AccordionHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadixAccordion.Header className={className}>
      {children}
    </RadixAccordion.Header>
  );
}

export function AccordionTrigger({
  children,
  className,
  arrowDownClassName,
}: {
  children: React.ReactNode;
  className?: string;
  arrowDownClassName?: string;
}) {
  return (
    <RadixAccordion.Trigger className={className}>
      {children}
      <BsChevronDown
        aria-hidden
        className={`${s.Icon} ${arrowDownClassName}`}
      />
    </RadixAccordion.Trigger>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadixAccordion.Content className={className}>
      {children}
    </RadixAccordion.Content>
  );
}
