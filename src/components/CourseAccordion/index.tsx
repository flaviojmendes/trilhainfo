import * as RadixAccordion from '@radix-ui/react-accordion';
import s from './CourseAccordion.module.css';
import { BsChevronDown } from 'react-icons/bs';
import { AdjacentLink, Level, Link, RoadmapItem, RoadmapModel } from '../../entity/RoadmapModel';
import { CourseCheckbox } from '../CourseCheckbox';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { RoadmapRead } from '../../entity/RoadmapReadModel';
import { useEffect, useState } from 'react';
import { set } from 'react-ga';

export const AccordionContainer = RadixAccordion.Root;
export const AccordionItem = RadixAccordion.Item;
export const AccordionHeader = RadixAccordion.Header;
export const AccordionContent = RadixAccordion.Content;

type CourseAccordionProps = {
  section: Level;
  saveRead: (checked: boolean) => void;
  setActiveLink: (link: Link) => void;
  adjacentLinks?: AdjacentLink[];
  activeLevel?: string;
  setActiveLevel?: (level: string) => void;
  activeItem?: string;
  setActiveItem?: (item: string) => void;
  activeChild?: string;
  setActiveChild?: (child: string) => void;
  updateReadAttribute: (
    label: string,
    checked: boolean,
    setSelectedItems: (items: RoadmapRead[]) => void,
    selectedItems: RoadmapRead[],
  ) => void;
  isRead: (label: string, selectedItems: RoadmapRead[]) => boolean;
  selectedItems: RoadmapRead[];
  setSelectedItems: (items: RoadmapRead[]) => void;
};

export function CourseAccordion({
  section,
  setActiveLink,
  adjacentLinks,
  activeItem,
  activeChild,
  setActiveChild,
  updateReadAttribute,
  setActiveItem,
  isRead,
  selectedItems,
  setSelectedItems,
}: CourseAccordionProps) {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setRerender(!rerender);
  }, [selectedItems, rerender]);

  return (
    <AccordionItem
      value={section.label || section.items[0].label}
      className={`${s.CourseItem} bg-[#342B30] text-xs font-normal`}
    >
      <AccordionHeader className={s.Header}>
        <CourseCheckbox
          checked={isRead(section.label || section.items[0].label, selectedItems)}
          toggleChecked={(checked: boolean) => {
            updateReadAttribute(
              section.label || section.items[0].label,
              checked,
              setSelectedItems,
              selectedItems,
            );
          }}
        />
        <AccordionTrigger className={s.CourseTrigger}>
          <span className="text-text-primary">{section.label || section.items[0].label}</span>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className={s.CourseContent}>
        <AccordionContainer
          className="w-full"
          collapsible
          type="single"
          value={activeItem}
          onValueChange={setActiveItem}
        >
          {section.items.map((item) => (
            <AccordionItem
              key={item.label}
              value={item.label || ''}
              className={`${s.CourseItem} bg-[#2D2329] font-normal`}
            >
              <AccordionHeader className={s.Header}>
                <CourseCheckbox
                  checked={isRead(`${section.label}-${item.label}`, selectedItems)}
                  toggleChecked={(checked: boolean) =>
                    updateReadAttribute(
                      `${section.label}-${item.label}`,
                      checked,
                      setSelectedItems,
                      selectedItems,
                    )
                  }
                />
                <AccordionTrigger className={s.Trigger}>
                  <span
                    className={`ml-2 text-text-primary ${
                      isRead(item.label, selectedItems) ? 'line-through' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className={s.CourseContent}>
                {item.children?.map((child) => (
                  <AccordionContainer
                    key={child.label}
                    value={activeChild}
                    onValueChange={setActiveChild}
                    className="w-full"
                    collapsible
                    type="single"
                  >
                    <AccordionItem
                      key={child.label}
                      value={child.label || ''}
                      className={`${s.CourseItem} bg-[#261C21] font-normal`}
                    >
                      <AccordionHeader className={s.Header}>
                        <CourseCheckbox
                          checked={isRead(`${item.label}-${child.label}`, selectedItems)}
                          toggleChecked={(checked: boolean) =>
                            updateReadAttribute(
                              `${item.label}-${child.label}`,
                              checked,
                              setSelectedItems,
                              selectedItems,
                            )
                          }
                        />
                        <AccordionTrigger className={s.Trigger}>
                          <span className="ml-3 text-text-primary">{child.label}</span>
                        </AccordionTrigger>
                      </AccordionHeader>
                      <AccordionContent>
                        {child.links?.map((link) => (
                          <div
                            key={link.label}
                            className={`flex gap-2 px-4  py-4 text-left ${
                              adjacentLinks?.[1]?.url === link.url
                                ? 'border-r-4 border-r-primary bg-[#501F3A]'
                                : ''
                            }`}
                          >
                            <CourseCheckbox
                              checked={isRead(`${child.label}-${link.label}`, selectedItems)}
                              toggleChecked={(checked: boolean) =>
                                updateReadAttribute(
                                  `${child.label}-${link.label}`,
                                  checked,
                                  setSelectedItems,
                                  selectedItems,
                                )
                              }
                            />
                            <button
                              onClick={() => setActiveLink(link)}
                              className={`my-auto ml-4 text-left text-text-primary hover:underline ${
                                isRead(link.label, selectedItems) ? 'line-through' : ''
                              }`}
                              rel="noreferrer"
                            >
                              {link.label}
                            </button>
                          </div>
                        ))}{' '}
                      </AccordionContent>
                    </AccordionItem>
                  </AccordionContainer>
                ))}
                {/* : (
                  <p className="text-red">Ainda não possuímos conteúdo.</p>
                )} */}
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionContainer>
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
