import { Button } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Divider } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { ChangeEvent, useState } from "react";
import {
  Level,
  Link,
  LinkContentType,
  RoadmapItem,
  RoadmapModel,
} from "../../../entity/RoadmapModel";
import { ItemField } from "../../../entity/ViewEnums";
import usePrompt from "../../../support/navigation";

type Props = {
  roadmap: RoadmapModel;
  setRoadmap: (roadmap: RoadmapModel) => void;
  setShouldBlock: (shouldBlock: boolean) => void;
  shouldBlock: boolean;
};

export default function NewRoadmapEditor(props: Props) {
  usePrompt(
    "Tem certeza que deseja sair? Você pode perder dados não salvos.",
    props.shouldBlock
  );

  function handleNewLevel() {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );
    roadmapTemp.addLevel({ items: [] });
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveLevel(level: Level) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );
    roadmapTemp?.removeLevel(level);
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleLevelTitleChange(
    event: ChangeEvent<HTMLInputElement>,
    level: Level,
    index: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

    level.label = event.target.value;
    roadmapTemp.getLevels()[index] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleLevelDescriptionChange(
    event: ChangeEvent<HTMLTextAreaElement>,
    level: Level,
    index: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

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
    itemField: ItemField
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

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
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

    level.items.push({ label: "" });
    roadmapTemp.getLevels()[index] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveItem(levelIndex: number, item: RoadmapItem) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );
    let items = roadmapTemp.levels[levelIndex].items.filter((obj) => {
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
    itemField: ItemField
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

    if (itemField === ItemField.LABEL) {
      item.label = event.target.value;
    } else if (itemField === ItemField.DESCRIPTION) {
      item.description = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex].children![
      sectionIndex
    ] = item;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleNewSection(
    level: Level,
    levelIndex: number,
    itemIndex: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

    if (!level.items[itemIndex].children) {
      level.items[itemIndex].children = [];
    }

    level.items[itemIndex].children!.push({ label: "" });

    roadmapTemp.getLevels()[levelIndex] = level;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleRemoveSection(
    levelIndex: number,
    itemIndex: number,
    section: RoadmapItem
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );
    let items = roadmapTemp.levels[levelIndex].items[
      itemIndex
    ].children!.filter((obj) => {
      return obj !== section;
    });
    roadmapTemp.levels[levelIndex].items[itemIndex].children = items;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }
  // End Section Functions

  // Link Functions
  function handleLinkChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    link: Link,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number,
    linkIndex: number,
    itemField: ItemField
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

    if (itemField === ItemField.LABEL) {
      link.label = event.target.value;
    } else if (itemField === ItemField.URL) {
      link.url = event.target.value;
    } else if (itemField === ItemField.TYPE) {
      link.contentType = event.target.value;
    }

    roadmapTemp.getLevels()[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links![linkIndex] = link;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  function handleNewLink(
    level: Level,
    levelIndex: number,
    itemIndex: number,
    sectionIndex: number
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );

    if (!level.items[itemIndex].children![sectionIndex].links) {
      level.items[itemIndex].children![sectionIndex].links = [];
    }

    level.items[itemIndex].children![sectionIndex].links!.push({
      label: "",
      url: "",
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
    link: Link
  ) {
    let roadmapTemp: RoadmapModel = Object.assign(
      new RoadmapModel(),
      props.roadmap
    );
    let items = roadmapTemp.levels[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links!.filter((obj) => {
      return obj !== link;
    });
    roadmapTemp.levels[levelIndex].items[itemIndex].children![
      sectionIndex
    ].links = items;
    props.setRoadmap(roadmapTemp);
    props.setShouldBlock(true);
  }

  return (
    <>
      <h2 className="txt-title text-light-orange text-center text-2xl ml-2 mb-2">
        Editor
      </h2>

      {props.roadmap?.getLevels().map((level, levelIndex) => {
        return (
          <div
            key={levelIndex}
            className={
              "pb-5 lg:w-full self-center md:ml-8 px-4 rounded-md " +
              (level.label || level.description
                ? "border-2 bd-red border-dotted bg-yellow"
                : "bg-white bg-opacity-50")
            }
          >
            <div className="w-full flex align-middle flex-wrap justify-end">
              <div className="grow flex">
                <span className="text-xs txt-title my-auto">
                  (Título e Descrição são Opcionais)
                </span>
              </div>
              <button
                className="m-auto my-2 cursor-pointer w-fit border-2 rounded-md p-1 bg-light-orange border-red"
                onClick={() => handleRemoveLevel(level)}
              >
                <DeleteIcon cursor={"pointer"} />{" "}
                <span className="text-sm txt-title">Remover Level</span>
              </button>
            </div>
            <div className="w-44 h-50 mx-auto text-center">
              <Input
                borderColor={"#000"}
                className="font-black txt-title placeholder:text-dark-blue"
                value={level.label}
                onChange={(e) => handleLevelTitleChange(e, level, levelIndex)}
                placeholder="Título"
                size="xs"
              />
            </div>
            <div className="w-full h-50 mx-auto mt-4 text-center">
              <Textarea
                borderColor={"#000"}
                className="font-black placeholder:text-dark-blue"
                value={level.description}
                onChange={(e) =>
                  handleLevelDescriptionChange(e, level, levelIndex)
                }
                placeholder="Descrição"
                size="xs"
              />
            </div>
            {/* Items */}
            <div className="w-full flex flex-col space-y-3 space-x-1 mt-4">
              {level.items.map((item, itemIndex) => {
                return (
                  <div
                    key={`item-${itemIndex}`}
                    className="flex flex-col space-y-2 mx-0 my-0 p-2 pt-3 md:p-3 w-full text-center border-2 rounded-md bd-red  hover:shadow-md bg-brown"
                  >
                    <div className="flex flex-row-reverse">
                      <button
                        className="mb-2 cursor-pointer w-fit txt-title text-sm border-2 rounded-md p-1 bg-light-orange border-red"
                        onClick={() => handleRemoveItem(levelIndex, item)}
                      >
                        <DeleteIcon cursor={"pointer"} /> Remover Item
                      </button>
                    </div>
                    <Input
                      className="font-black placeholder:text-dark-blue"
                      border="2px"
                      borderColor={"#ee8561"}
                      value={item.label}
                      onChange={(e) =>
                        handleItemChange(
                          e,
                          item,
                          levelIndex,
                          itemIndex,
                          ItemField.LABEL
                        )
                      }
                      placeholder="Título"
                      size="xs"
                    />
                    <Textarea
                      className="font-black placeholder:text-dark-blue"
                      border="2px"
                      borderColor={"#ee8561"}
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(
                          e,
                          item,
                          levelIndex,
                          itemIndex,
                          ItemField.DESCRIPTION
                        )
                      }
                      placeholder="Descrição"
                      size="xs"
                    />
                    <span className="font-semibold">Seções</span>
                    {/* Sections */}

                    {item.children?.map((section, sectionIndex) => {
                      return (
                        <div>
                          <div
                            className="m-auto my-2 cursor-pointer w-fit txt-title text-sm border-2 rounded-md p-1 bg-light-orange border-red"
                            onClick={() =>
                              handleRemoveSection(
                                levelIndex,
                                itemIndex,
                                section
                              )
                            }
                          >
                            <DeleteIcon cursor={"pointer"} /> Remover Seção
                          </div>

                          <Input
                            className="font-black placeholder:text-dark-blue"
                            border="2px"
                            borderColor={"#59c0e4"}
                            value={section.label}
                            onChange={(e) =>
                              handleSectionChange(
                                e,
                                section,
                                levelIndex,
                                itemIndex,
                                sectionIndex,
                                ItemField.LABEL
                              )
                            }
                            placeholder="Título"
                            size="xs"
                          />
                          {/* Links */}
                          {section.links?.map((link, linkIndex) => {
                            return (
                              <>
                                <Divider borderColor={"yellow.500"} mt="2" />
                                <div
                                  className="m-auto my-2 cursor-pointer w-fit txt-title text-sm border-2 rounded-md p-1 bg-light-orange border-red"
                                  onClick={() =>
                                    handleRemoveLink(
                                      levelIndex,
                                      itemIndex,
                                      sectionIndex,
                                      link
                                    )
                                  }
                                >
                                  <DeleteIcon cursor={"pointer"} /> Remover Link
                                </div>

                                <div className="flex flex-wrap md:space-x-2 mt-2">
                                  <div className="w-full md:w-4/12">
                                    <Input
                                      className="font-black placeholder:text-dark-blue"
                                      border="2px"
                                      borderColor={"#eabc54"}
                                      value={link.label}
                                      onChange={(e) =>
                                        handleLinkChange(
                                          e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.LABEL
                                        )
                                      }
                                      placeholder="Título do Link"
                                      size="xs"
                                    />
                                  </div>
                                  <div className="w-full md:w-5/12">
                                    <Input
                                      className="font-black placeholder:text-dark-blue"
                                      border="2px"
                                      borderColor={"#eabc54"}
                                      value={link.url}
                                      onChange={(e) =>
                                        handleLinkChange(
                                          e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.URL
                                        )
                                      }
                                      placeholder="URL do Link"
                                      size="xs"
                                    />
                                  </div>
                                  <div className="w-full md:w-2/12">
                                    <Select
                                      placeholder="Select option"
                                      border="2px"
                                      value={link.contentType}
                                      borderColor={"#eabc54"}
                                      onChange={(e) =>
                                        handleLinkChange(
                                          e,
                                          link,
                                          levelIndex,
                                          itemIndex,
                                          sectionIndex,
                                          linkIndex,
                                          ItemField.TYPE
                                        )
                                      }
                                      size="xs"
                                    >
                                      {Object.values(LinkContentType).map(
                                        (type) => {
                                          return (
                                            <option value={type}>{type}</option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                          <div className="w-full flex mt-4">
                            <button
                              className="my-2 text-xs font-semibold mx-auto bg-yellow rounded-md p-2 border-yellow border-2"
                              onClick={() =>
                                handleNewLink(
                                  level,
                                  levelIndex,
                                  itemIndex,
                                  sectionIndex
                                )
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
                    <div className="w-full flex mt-8">
                      <button
                        className="my-2 text-xs font-semibold mx-auto bg-blue rounded-md p-2 border-dark-blue border-2"
                        onClick={() =>
                          handleNewSection(level, levelIndex, itemIndex)
                        }
                      >
                        + Nova Seção
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items End */}
            <div className="w-full flex mt-4">
              <button
                className="my-2 text-xs font-semibold mx-auto bg-light-brown rounded-md p-2 border-red border-2"
                onClick={() => handleNewItem(level, levelIndex)}
              >
                + Novo Item
              </button>
            </div>
          </div>
        );
      })}

      <Button
        my="4"
        mx={"auto"}
        colorScheme="yellow"
        variant="solid"
        onClick={handleNewLevel}
      >
        + Novo Nível
      </Button>
    </>
  );
}
