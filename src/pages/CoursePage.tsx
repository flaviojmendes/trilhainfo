import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { AdjacentLink, Level, Link, RoadmapItem } from '../entity/RoadmapModel';
import useDocumentTitle from '../components/useDocumentTitle';
import { roadmaps } from '../roadmaps/roadmaps';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { emojisplosion } from 'emojisplosion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import { RiOrganizationChart } from 'react-icons/ri';
import { AccordionContainer, CourseAccordion } from '../components/CourseAccordion';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { RoadmapRead } from '../entity/RoadmapReadModel';
import {
  convertToRoadmapRead,
  findRoadmapReadItem,
  isRead,
  updateReadAttribute,
} from '../support/roadmapUtils';

export default function CoursePage() {
  const { name } = useParams<string>();
  const [roadmapName, setRoadmapName] = useState('');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>();
  const [selectedItems, setSelectedItems] = useLocalStorage(
    `selectedItems-${name}`,
    [] as RoadmapRead[],
  );

  const currentRoadmap = (
    name ? (name in roadmaps ? name : 'frontend') : 'frontend'
  ) as keyof typeof roadmaps;

  const [adjacentLinks, setAdjacentLinks] = useState<AdjacentLink[]>();
  const [activeLink, setActiveLink] = useState<Link>();
  const [activeItem, setActiveItem] = useState<string>();
  const [activeChild, setActiveChild] = useState<string>();
  const [activeLevel, setActiveLevel] = useState<string>();

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    setRerender(!rerender);
  }, [selectedItems, rerender]);

  useEffect(() => {
    setRoadmapName(name || '');
    findAdjacentLinks();
    (async () => {
      if (!selectedItems || selectedItems.length === 0) {
        const roadmapRead = convertToRoadmapRead(roadmaps[currentRoadmap].file);
        setSelectedItems(roadmapRead);
      }
    })();
  }, [name, currentRoadmap]);

  useDocumentTitle(
    `Trilha Info ${name && name in roadmaps ? ` - ${roadmaps[currentRoadmap].title}` : ''}`,
  );

  function extractVideoId(url: string | undefined): string | null {
    if (!url) return null;

    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  function findAdjacentLinks(selectedLink?: Link) {
    let previousLink: Link | undefined;
    let nextLink: Link | undefined;

    const links = extractLinks(roadmaps[currentRoadmap].file);

    if (!selectedLink) {
      selectedLink = links[0];
    }

    setActiveLink(selectedLink);

    links.forEach((link, index) => {
      if (link.label === selectedLink?.label) {
        previousLink = links[index - 1];
        nextLink = links[index + 1];
      }
    });
    const linkParents = findLinkParents(selectedLink);

    setActiveLevel(linkParents.level?.label || linkParents.level?.items[0].label);
    setActiveItem(linkParents.item?.label);
    setActiveChild(linkParents.child?.label);

    setAdjacentLinks([previousLink, selectedLink, nextLink]);
  }

  function extractLinks(data: Level[]): Link[] {
    const extractedLinks: Link[] = [];

    for (const item of data) {
      if (item.items) {
        for (const child of item.items) {
          if (child.children) {
            for (const subChild of child.children) {
              if (subChild.links) {
                extractedLinks.push(...subChild.links);
              }
            }
          }
        }
      }
    }

    return extractedLinks;
  }

  function findLinkParents(link: Link) {
    for (const level of roadmaps[currentRoadmap].file) {
      for (const item of level.items) {
        for (const child of item.children || []) {
          for (const childLink of child.links || []) {
            if (childLink.label === link.label) {
              return { level, item, child };
            }
          }
        }
      }
    }

    return {};
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="h-full w-[300px] bg-[#342B30]">
          <h1 className="ml-4 py-4 text-lg text-text-primary">Trilha {roadmapName}</h1>
          <AccordionContainer
            value={activeLevel || ''}
            onValueChange={setActiveLevel}
            className="w-full"
            collapsible
            type="single"
          >
            {roadmaps[currentRoadmap].file.map((level) => (
              <CourseAccordion
                selectedItems={selectedItems}
                key={level.label}
                section={level}
                updateReadAttribute={updateReadAttribute}
                isRead={isRead}
                saveRead={(checked: boolean) =>
                  updateReadAttribute(level.label || '', checked, setSelectedItems, selectedItems)
                }
                setActiveLink={(link: Link) => findAdjacentLinks(link)}
                setActiveLevel={setActiveLevel}
                setActiveChild={setActiveChild}
                setActiveItem={setActiveItem}
                activeLevel={activeLevel}
                activeItem={activeItem}
                activeChild={activeChild}
                adjacentLinks={adjacentLinks}
                setSelectedItems={setSelectedItems}
              />
            ))}
          </AccordionContainer>
        </div>
        <div className="flex h-full w-full flex-col p-4">
          <div className="flex w-fit flex-row">
            <a href="/roadmap" className="flex h-fit gap-2 text-primary">
              <FaArrowLeft className="my-auto" /> voltar à visualização tradicional{' '}
              <RiOrganizationChart className="my-auto" />
            </a>
          </div>
          <div className="flex flex-col">
            <div className="my-10  flex">
              <div className="flex w-4 bg-gradient-to-r from-text-secondary via-text-secondary to-black "></div>
              <h1 className="my-auto mr-10 h-fit text-xl text-white">{activeLink?.label}</h1>
              {!extractVideoId(activeLink?.url) && (
                <a
                  type="button"
                  href={activeLink?.url}
                  className="z-20 my-auto flex gap-2 rounded-sm bg-primary p-2 text-center font-title duration-100 hover:bg-primary-hover hover:shadow-primary-white"
                >
                  <FaExternalLinkAlt className="my-auto" /> {'acessar conteúdo'}
                </a>
              )}
            </div>
            <div className="flex h-full flex-col">
              {extractVideoId(activeLink?.url) && (
                <div className="mx-auto flex flex-col gap-4">
                  <YoutubeEmbed embedId={extractVideoId(activeLink?.url) || ''} />
                </div>
              )}
              {!extractVideoId(activeLink?.url) && (
                <div className="flex flex-col">
                  <p className="font-light text-white">
                    Este conteúdo está disponível em um link externo.
                  </p>
                  <p className="font-light text-white">Acesse-o antes de completar.</p>
                </div>
              )}
              <div className="mx-64 mt-8 flex gap-4">
                {!isRead(
                  findRoadmapReadItem(activeLink?.label, selectedItems)?.label || '',
                  selectedItems,
                ) && (
                  <button
                    type="button"
                    onClick={() =>
                      updateReadAttribute(
                        findRoadmapReadItem(activeLink?.label, selectedItems)?.label || '',
                        true,
                        setSelectedItems,
                        selectedItems,
                      )
                    }
                    className="z-20 flex gap-2 rounded-sm border-2 border-primary p-2 text-center font-title text-primary duration-100  hover:shadow-secondary-white"
                  >
                    <FaCheck className="my-auto" /> {'concluir conteúdo'}
                  </button>
                )}
                {isRead(
                  findRoadmapReadItem(activeLink?.label, selectedItems)?.label || '',
                  selectedItems,
                ) && (
                  <button
                    type="button"
                    onClick={() =>
                      updateReadAttribute(
                        findRoadmapReadItem(activeLink?.label, selectedItems)?.label || '',
                        false,
                        setSelectedItems,
                        selectedItems,
                      )
                    }
                    className="z-20 flex gap-2 rounded-sm border-2 border-primary bg-primary p-2 text-center font-title text-text-primary duration-100  hover:shadow-secondary-white"
                  >
                    <FaCheck className="my-auto" /> {'desmarcar conteúdo'}
                  </button>
                )}
                <div className="grow"></div>
                {adjacentLinks?.[0] && (
                  <button
                    onClick={() => findAdjacentLinks(adjacentLinks?.[0])}
                    className="flex gap-2 text-primary underline"
                  >
                    <FaArrowLeft className="my-auto" />
                    <span className="my-auto">anterior</span>
                  </button>
                )}
                {adjacentLinks?.[2] && (
                  <button
                    onClick={() => findAdjacentLinks(adjacentLinks?.[2])}
                    className="flex gap-2 text-primary underline"
                  >
                    <span className="my-auto">próximo</span>
                    <FaArrowRight className="my-auto" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
