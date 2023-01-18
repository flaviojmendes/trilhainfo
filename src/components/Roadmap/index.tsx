import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Level, RoadmapItem } from '../../entity/RoadmapModel';
import LevelItem from '../LevelItem';
import { useLocation } from 'react-router-dom';
import { emojisplosion } from 'emojisplosion';
import Note from '../Note';
import RoadmapButtons from '../RoadmapButtons';
import { useAuth0 } from '@auth0/auth0-react';
import { AccordionContainer, RoadmapAccordion } from '../Accordion';

type Props = {
  data: Level[];
  title: string;
  name: string;
  isPreview: boolean;
};

export default function Roadmap(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth0();

  const roadmapRef = useRef(null);
  const { pathname, hash, key } = useLocation();
  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>();
  const [selectedItems, setSelectedItems] = useLocalStorage(
    'selectedItems',
    {} as { [key: string]: boolean },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: { clientX: any; clientY: any }) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('selectedItems')) {
      setSelectedItems(JSON.parse(localStorage.getItem('selectedItems') || '') || {});
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const anchorItem = hash.replaceAll('#', '');
      let itemFound = false;
      if (anchorItem) {
        props.data.map((level) => {
          level.items.map((item) => {
            if (item.label === decodeURI(anchorItem)) {
              setActiveItem(item);
              onOpen();
              itemFound = true;
            }
          });
        });
      }
    }
  }, [pathname, hash, key]);

  function saveRead(label: string, checked: boolean) {
    let selected = selectedItems;
    if (!selected) {
      selected = {};
    }
    selected[label] = checked;
    setSelectedItems(selected);
    localStorage.setItem('selectedItems', JSON.stringify(selected));

    if (checked) {
      emojisplosion({
        emojiCount: 1,
        uniqueness: 1,
        position: {
          x: mousePos?.x || innerWidth / 2,
          y: mousePos?.y || innerHeight / 2,
        },
        emojis: ['🎉', '🎊', '🎈', '🤓'],
      });
    }
  }

  function isRead(label: string) {
    if (selectedItems) {
      return selectedItems[label];
    }
    return false;
  }

  function isAllContentRead(label: string, contentLength: number) {
    if (selectedItems) {
      const contentRead = Object.keys(selectedItems).filter(
        (key) => key.endsWith('-' + label) && selectedItems[key] === true,
      );
      return contentRead.length === contentLength;
    }

    return false;
  }

  function checkAllContent(label: string, check: boolean) {
    props.data.forEach((level) => {
      level.items.forEach((item) => {
        if (item.label === label) {
          item.children?.forEach((child) => {
            saveRead(child.label + '-' + item.label, check);
          });
        }
      });
    });

    if (check) {
      emojisplosion({
        emojiCount: 1,
        uniqueness: 1,
        position: {
          x: mousePos?.x || innerWidth / 2,
          y: mousePos?.y || innerHeight / 2,
        },
        emojis: ['🎉', '🎊', '🎈', '🤓'],
      });
    }
  }

  function handleCloseDrawer() {
    window.history.pushState(props.name, props.name, `/roadmap/${props.name}`);
    onClose();
  }

  return (
    <>
      <div className={props.isPreview ? 'hidden' : 'flex'}>
        <div className="flex-grow"></div>
        <RoadmapButtons
          buttons={
            isAuthenticated
              ? ['horizontalView', 'download', 'exportNotes']
              : ['horizontalView', 'download']
          }
          title={props.title}
          roadmapRef={roadmapRef}
        />
      </div>
      <section ref={roadmapRef} className="pb-8">
        <h2
          className={`c-yellow c-dark-brown my-6 text-center font-title text-3xl font-bold ${
            props.isPreview ? 'hidden' : ''
          }`}
        >
          {props.title}
        </h2>
        <div>
          {props.data.map((level, index, data) => {
            return (
              <LevelItem
                key={index}
                level={level}
                index={index}
                isAllContentRead={isAllContentRead}
                checkAllContent={checkAllContent}
                levelsQty={data.length}
                onOpen={onOpen}
                setActiveItem={setActiveItem}
              />
            );
          })}
        </div>

        <Drawer isOpen={isOpen} size={'lg'} placement="right" onClose={handleCloseDrawer}>
          <DrawerOverlay />
          <DrawerContent bgColor={'#444140'}>
            <DrawerCloseButton
              color={'#2A2827'}
              backgroundColor={'#eabc54'}
              _hover={{ backgroundColor: '#e9dad5' }}
            />
            <DrawerHeader>
              <span className="font-title text-light-brown">{activeItem?.label}</span>
            </DrawerHeader>

            <DrawerBody>
              <p className="mb-4 font-title text-light-brown">{activeItem?.description}</p>
              <AccordionContainer className="w-full" collapsible type="single">
                {activeItem?.children?.map((child) => {
                  return (
                    <RoadmapAccordion
                      section={child}
                      isRead={isRead}
                      saveRead={saveRead}
                      activeItemLabel={activeItem.label}
                    />
                  );
                })}
              </AccordionContainer>
              {!props.isPreview && (
                <Note id={activeItem?.label || 'asdasd'} title={activeItem?.label || ''} />
              )}
            </DrawerBody>

            <DrawerFooter>
              <div className="flex space-x-4">
                <a
                  className="twitter-share-button rounded-md bg-blue px-2 py-2 text-center align-middle font-semibold transition-colors hover:bg-dark-blue"
                  href={`https://twitter.com/intent/tweet?text=Vem estudar ${
                    activeItem?.label
                  } comigo na Trilha Info.&url=https://trilha.info/roadmap/${
                    props.name
                  }${encodeURIComponent('#' + activeItem?.label || '')}`}
                >
                  Compartilhar no Twitter
                </a>
                <button
                  className="mr-3 rounded-md bg-yellow px-4 font-bold text-[black] transition-colors hover:bg-dark-yellow disabled:cursor-not-allowed disabled:hover:bg-yellow"
                  onClick={handleCloseDrawer}
                >
                  Fechar
                </button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </>
  );
}
