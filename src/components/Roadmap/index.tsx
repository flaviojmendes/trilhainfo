import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Level, RoadmapItem } from '../../entity/RoadmapModel';
import LevelItem from '../LevelItem';
import { useLocation } from 'react-router-dom';
import { emojisplosion } from 'emojisplosion';
import RoadmapButtons from '../RoadmapButtons';
import { useAuth0 } from '@auth0/auth0-react';
import { AccordionContainer, RoadmapAccordion } from '../Accordion';
import { DrawerRoot, Drawer, DrawerTitle, DrawerDescription } from '../Drawer';
import { RoadmapRead } from '../../entity/RoadmapReadModel';
import { convertToRoadmapRead, isRead, updateReadAttribute } from '../../support/roadmapUtils';
import { set } from 'react-ga';

type Props = {
  data: Level[];
  title: string;
  roadmapPath: string;
  name: string;
  isPreview: boolean;
};

export default function Roadmap({ data, title, roadmapPath, name, isPreview }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastSelectedElement, setLastSelectedElement] = useState<HTMLElement | null>(null);
  const { isAuthenticated } = useAuth0();

  const roadmapRef = useRef(null);
  const { pathname, hash, key } = useLocation();
  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();

  const [selectedItems, setSelectedItems] = useLocalStorage(
    `selectedItems-${name}`,
    [] as RoadmapRead[],
  );

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        window.history.pushState(name, name, `/roadmap/${name}`);
        setIsDrawerOpen(isOpen);
      }

      setIsDrawerOpen(isOpen);
    },
    [name],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedItems || selectedItems.length === 0) {
        const roadmapRead = convertToRoadmapRead(data);
        setSelectedItems(roadmapRead);
      }
    })();
  }, [setSelectedItems]);

  useEffect(() => {
    if (hash) {
      const anchorItem = hash.replaceAll('#', '');
      if (anchorItem) {
        data.forEach((level) => {
          level.items.forEach((item) => {
            if (item.label === decodeURI(anchorItem)) {
              setActiveItem(item);
              handleOpenChange(true);
            }
          });
        });
      }
    }
  }, [pathname, hash, key, handleOpenChange, data]);

  function checkAllContent(label: string, check: boolean) {
    data.forEach((level) => {
      level.items.forEach((item) => {
        if (item.label === label) {
          item.children?.forEach((child) => {
            updateReadAttribute(
              child.label + '-' + item.label,
              check,
              setSelectedItems,
              selectedItems || [],
            );
          });
        }
      });
    });

    if (check) {
      emojisplosion({
        emojiCount: 5,
        uniqueness: 3,
        position: {
          x: innerWidth / 2,
          y: innerHeight / 2,
        },
        emojis: ['🎉', '🎊', '🎈', '🤓'],
      });
    }
  }

  return (
    <DrawerRoot open={isDrawerOpen} onOpenChange={handleOpenChange}>
      <div
        className={`my-10 gap-2 px-2 pr-2 md:pr-4 lg:my-0 xl:px-64 ${
          isPreview ? 'hidden' : 'flex'
        }`}
      >
        <div className="flex-grow"></div>
        <RoadmapButtons
          buttons={
            isAuthenticated
              ? ['horizontalView', 'download', 'exportNotes']
              : ['horizontalView', 'download']
          }
          title={title}
          roadmapPath={roadmapPath}
          roadmapRef={roadmapRef}
        />
      </div>
      <section ref={roadmapRef} className="pb-8 xl:px-64">
        <div className="mb-10 flex">
          <div className="flex w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black "></div>
          <h2
            className={` font-title text-3xl font-bold text-text-primary ${
              isPreview ? 'hidden' : ''
            }`}
          >
            {title}
          </h2>
        </div>

        <div>
          {data.map((level, index, data) => {
            return (
              <LevelItem
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems || []}
                key={index}
                level={level}
                index={index}
                checkAllContent={checkAllContent}
                levelsQty={data.length}
                setActiveItem={setActiveItem}
                updateLastSelectedElement={setLastSelectedElement}
              />
            );
          })}
        </div>
      </section>

      <RoadmapDrawer
        activeItem={activeItem}
        isRead={isRead}
        saveRead={updateReadAttribute}
        isPreview={isPreview}
        selectedItems={selectedItems || []}
        setSelectedItems={setSelectedItems}
        lastSelectedElement={lastSelectedElement}
      />
    </DrawerRoot>
  );
}

type RoadmapDrawerProps = {
  activeItem?: RoadmapItem;
  isRead: (label: string, selectedItems: RoadmapRead[]) => boolean;
  saveRead: (
    label: string,
    checked: boolean,
    setSelectedItems: (items: RoadmapRead[]) => void,
    selectedItems: RoadmapRead[],
  ) => void;
  isPreview?: boolean;
  lastSelectedElement?: HTMLElement | null;
  setSelectedItems: (items: RoadmapRead[]) => void;
  selectedItems: RoadmapRead[];
};

const RoadmapDrawer = ({
  activeItem,
  isPreview,
  isRead,
  saveRead,
  lastSelectedElement,
  setSelectedItems,
  selectedItems,
}: RoadmapDrawerProps) => {
  return (
    <Drawer lastSelectedElement={lastSelectedElement}>
      <DrawerTitle className="text-2xl font-bold text-text-primary">
        {activeItem?.label}
      </DrawerTitle>
      <DrawerDescription className="mb-4 pt-6 font-title text-text-primary">
        {activeItem?.description}
      </DrawerDescription>

      <div>
        <AccordionContainer
          defaultValue={activeItem?.children?.[0].label}
          className="w-full"
          collapsible
          type="single"
        >
          {activeItem?.children?.map((child) => {
            const label = activeItem?.label + '-' + child.label;

            return (
              <RoadmapAccordion
                key={child.label}
                section={child}
                isRead={isRead(label, selectedItems)}
                saveRead={(checked: boolean) =>
                  saveRead(label, checked, setSelectedItems, selectedItems)
                }
              />
            );
          })}
        </AccordionContainer>
        {/* {!isPreview && <Note id={activeItem?.label || 'asdasd'} title={activeItem?.label || ''} />} */}
      </div>
    </Drawer>
  );
};
