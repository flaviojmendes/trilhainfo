/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeEvent } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import {
  Level,
  Link,
  LinkContentType,
  RoadmapItem,
  RoadmapModel,
} from '../../../entity/RoadmapModel';
import { ItemField } from '../../../entity/ViewEnums';
import usePrompt from '../../../support/navigation';

type Props = {
  roadmap: RoadmapModel;
  setRoadmap: (roadmap: RoadmapModel) => void;
  setShouldBlock: (shouldBlock: boolean) => void;
  shouldBlock: boolean;
};

export default function NewRoadmapEditor(props: Props) {
  usePrompt('Tem certeza que deseja sair? Você pode perder dados não salvos.', props.shouldBlock);

  function handleNewLevel() {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);
    roadmapTemp.addLevel({ items: [] });
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveLevel(level: Level) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);
    roadmapTemp?.removeLevel(level);
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleLevelTitleChange(
    event: ChangeEvent<HTMLInputElement>,
    level: Level,
    index: number,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    level.label = event.target.value;
    roadmapTemp.getLevels()[index] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleLevelDescriptionChange(
    event: ChangeEvent<HTMLTextAreaElement>,
    level: Level,
    index: number,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    level.description = event.target.value;
    roadmapTemp.getLevels()[index] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  // Item Functions
  function handleItemChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: RoadmapItem,
    levelIndex: number,
    itemIndex: number,
    itemField: ItemField,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    if (itemField === ItemField.LABEL) {
      item.label = event.target.value;
    } else if (itemField === ItemField.DESCRIPTION) {
      item.description = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex] = item;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleNewItem(level: Level, index: number) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    level.items.push({ label: '' });
    roadmapTemp.getLevels()[index] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveItem(levelIndex: number, item: RoadmapItem) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);
    const items = roadmapTemp.levels[levelIndex].items.filter((obj) => {
      return obj !== item;
    });
    roadmapTemp.levels[levelIndex].items = items;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  // Section Functions
  function handleSectionChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: RoadmapItem,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    itemField: ItemField,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    if (itemField === ItemField.LABEL) {
      item.label = event.target.value;
    } else if (itemField === ItemField.DESCRIPTION) {
      item.description = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex].children![sectionIndex] = item;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleNewSection(level: Level, levelIndex: number, itemIndex: number) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    if (!level.items[itemIndex].children) {
      level.items[itemIndex].children = [];
    }

    level.items[itemIndex].children!.push({ label: '' });

    roadmapTemp.getLevels()[levelIndex] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveSection(levelIndex: number, itemIndex: number, section: RoadmapItem) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);
    const items = roadmapTemp.levels[levelIndex].items[itemIndex].children!.filter((obj) => {
      return obj !== section;
    });
    roadmapTemp.levels[levelIndex].items[itemIndex].children = items;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }
  // End Section Functions

  // Link Functions
  function handleLinkChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    link: Link,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    linkIndex: number,
    itemField: ItemField,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    if (itemField === ItemField.LABEL) {
      link.label = event.target.value;
    } else if (itemField === ItemField.URL) {
      link.url = event.target.value;
    } else if (itemField === ItemField.TYPE) {
      link.contentType = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex].children![sectionIndex].links![linkIndex] =
      link;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleNewLink(
    level: Level,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);

    if (!level.items[itemIndex].children![sectionIndex].links) {
      level.items[itemIndex].children![sectionIndex].links = [];
    }

    level.items[itemIndex].children![sectionIndex].links!.push({
      label: '',
      url: '',
      contentType: LinkContentType.WATCH,
    });

    roadmapTemp.getLevels()[levelIndex] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveLink(
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    link: Link,
  ) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), props.roadmap);
    const items = roadmapTemp.levels[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links!.filter((obj) => {
      return obj !== link;
    });
    roadmapTemp.levels[levelIndex].items[itemIndex].children![sectionIndex].links = items;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  return (
    <>
      <h2 className="ml-2 mb-2 text-center font-title text-2xl text-light-orange">Editor</h2>

      {props.roadmap?.getLevels().map((level, levelIndex) => {
        return (
          <div
            key={levelIndex}
            className={
              'self-center rounded-md px-4 pb-5 md:ml-8 lg:w-full ' +
              (level.label || level.description
                ? 'border-2 border-dotted border-dark-red bg-light-yellow'
                : 'bg-white bg-opacity-50')
            }
          >
            <div className="flex w-full flex-wrap justify-end align-middle">
              <div className="flex grow">
                <span className="my-auto font-title text-xs">
                  (Título e Descrição são Opcionais)
                </span>
              </div>
              <button
                className="m-auto my-2 flex w-fit cursor-pointer rounded-md border-2 border-red bg-light-orange p-1"
                onClick={() => handleRemoveLevel(level)}
              >
                <FiTrash2 cursor={'pointer'} />
                <span className="font-title text-sm">Remover Level</span>
              </button>
            </div>
            <div className="h-50 mx-auto w-44 text-center">
              <input
                type="text"
                className="font-title font-black placeholder:text-dark-blue"
                value={level.label}
                onChange={(e) => handleLevelTitleChange(e, level, levelIndex)}
                placeholder="Título"
              />
            </div>
            <div className="h-50 mx-auto mt-4 w-full text-center">
              <textarea
                className="font-black placeholder:text-dark-blue"
                value={level.description}
                onChange={(e) => handleLevelDescriptionChange(e, level, levelIndex)}
                placeholder="Descrição"
              />
            </div>
            {/* Items */}
            <div className="mt-4 flex w-full flex-col space-y-3 space-x-1">
              {level.items.map((item, itemIndex) => {
                return (
                  <div
                    key={`item-${itemIndex}`}
                    className="mx-0 my-0 flex w-full flex-col space-y-2 rounded-md border-2 border-dark-red bg-brown p-2 pt-3 text-center  hover:shadow-md md:p-3"
                  >
                    <div className="flex flex-row-reverse">
                      <button
                        className="mb-2 flex w-fit cursor-pointer rounded-md border-2 border-red bg-light-orange p-1 font-title text-sm"
                        onClick={() => handleRemoveItem(levelIndex, item)}
                      >
                        <FiTrash2 cursor={'pointer'} /> Remover Item
                      </button>
                    </div>
                    <input
                      type="text"
                      className="font-black placeholder:text-dark-blue"
                      value={item.label}
                      onChange={(e) =>
                        handleItemChange(e, item, levelIndex, itemIndex, ItemField.LABEL)
                      }
                      placeholder="Título"
                    />

                    <textarea
                      className="font-black placeholder:text-dark-blue"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(e, item, levelIndex, itemIndex, ItemField.DESCRIPTION)
                      }
                      placeholder="Descrição"
                    />

                    <span className="font-semibold">Seções</span>
                    {/* Sections */}

                    {item.children?.map((section, sectionIndex) => {
                      return (
                        <div key={section.label}>
                          <div
                            className="m-auto my-2 flex w-fit cursor-pointer rounded-md border-2 border-red bg-light-orange p-1 font-title text-sm"
                            onClick={() => handleRemoveSection(levelIndex, itemIndex, section)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleRemoveSection(levelIndex, itemIndex, section);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <FiTrash2 cursor={'pointer'} /> Remover Seção
                          </div>

                          <input
                            type="text"
                            className="font-black placeholder:text-dark-blue"
                            value={section.label}
                            onChange={(e) =>
                              handleSectionChange(
                                e,
                                section,
                                levelIndex,
                                itemIndex,
                                sectionIndex,
                                ItemField.LABEL,
                              )
                            }
                            placeholder="Título"
                          />

                          {/* Links */}
                          {section.links?.map((link, linkIndex) => {
                            return (
                              <>
                                <div
                                  className="m-auto my-2 flex w-fit cursor-pointer rounded-md border-2 border-red bg-light-orange p-1 font-title text-sm"
                                  onClick={() =>
                                    handleRemoveLink(levelIndex, itemIndex, sectionIndex, link)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleRemoveLink(levelIndex, itemIndex, sectionIndex, link);
                                    }
                                  }}
                                  role="button"
                                  tabIndex={0}
                                >
                                  <FiTrash2 cursor={'pointer'} /> Remover Link
                                </div>

                                <div className="mt-2 flex flex-wrap md:space-x-2">
                                  <div className="w-full md:w-4/12">
                                    <input
                                      type="text"
                                      className="font-black placeholder:text-dark-blue"
                                      value={link.label}
                                      onChange={(e) =>
                                        handleLinkChange(
                                          e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.LABEL,
                                        )
                                      }
                                      placeholder="Título do Link"
                                    />
                                  </div>
                                  <div className="w-full md:w-5/12">
                                    <input
                                      type="text"
                                      className="font-black placeholder:text-dark-blue"
                                      value={link.url}
                                      onChange={(e) =>
                                        handleLinkChange(
                                          e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.URL,
                                        )
                                      }
                                      placeholder="URL do Link"
                                    />
                                  </div>
                                  <div className="w-full md:w-2/12">
                                    <select
                                      placeholder="Select option"
                                      value={link.contentType}
                                      onChange={(e) =>
                                        handleLinkChange(
                                          e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.TYPE,
                                        )
                                      }
                                    >
                                      {Object.values(LinkContentType).map((type) => {
                                        return (
                                          <option key={type} value={type}>
                                            {type}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                          <div className="mt-4 flex w-full">
                            <button
                              className="my-2 mx-auto rounded-md border-2 border-yellow bg-light-yellow p-2 text-xs font-semibold"
                              onClick={() =>
                                handleNewLink(level, levelIndex, itemIndex, sectionIndex)
                              }
                            >
                              + Novo Link
                            </button>
                          </div>
                          {/* Links End */}
                        </div>
                      );
                    })}
                    {/* Sections End */}
                    <div className="mt-8 flex w-full">
                      <button
                        className="my-2 mx-auto rounded-md border-2 border-dark-blue bg-blue p-2 text-xs font-semibold"
                        onClick={() => handleNewSection(level, levelIndex, itemIndex)}
                      >
                        + Nova Seção
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items End */}
            <div className="mt-4 flex w-full">
              <button
                className="my-2 mx-auto rounded-md border-2 border-red bg-light-brown p-2 text-xs font-semibold"
                onClick={() => handleNewItem(level, levelIndex)}
              >
                + Novo Item
              </button>
            </div>
          </div>
        );
      })}

      <button className="my-4 mx-auto" onClick={handleNewLevel}>
        + Novo Nível
      </button>
    </>
  );
}
