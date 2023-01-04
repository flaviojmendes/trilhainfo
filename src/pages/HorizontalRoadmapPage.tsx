import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import useDocumentTitle from "../components/useDocumentTitle";
import { roadmaps } from "../roadmaps/roadmaps";
import { data as frontendData } from "../roadmaps/frontend";
import { data as reactData } from "../roadmaps/react";
import { data as backendData } from "../roadmaps/backend";
import { data as devopsData } from "../roadmaps/devops";
import { data as communityData } from "../roadmaps/community";
import { dataEngineeringData } from "../roadmaps/dataEngineering";
import { Level, RoadmapItem } from "../entity/RoadmapModel";
import { FaArrowLeft, FaArrowRight, FaRegCircle } from "react-icons/fa";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { getColorFromContentType } from "../support/contentType";
import { emojisplosion } from "emojisplosion";
import { useLocalStorage } from "react-use";
import { CheckIcon } from "@chakra-ui/icons";
import HorizontalLevelItem from "../components/HorizontalRoadmap/HorizontalLevelItem/HorizontalLevelItem";
import HorizontalRoadmapFooter from "../components/HorizontalRoadmap/HorizontalRoadmapFooter/HorizontalRoadmapFooter";
import Note from "../components/Note/Note";
import RoadmapButtons from "../components/RoadmapButtons";

export default function HorizontalRoadmapPage() {
  const { name } = useParams<string>();
  const [roadmapName, setRoadmapName] = useState("");
  const [roadmapData, setRoadmapData] = useState<Level[]>();
  const [roadmapLevel, setRoadmapLevel] = useState<Level>();
  const roadmapRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<RoadmapItem>();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>();
  const [selectedItems, setSelectedItems, remove] = useLocalStorage(
    "selectedItems",
    {} as { [key: string]: boolean }
  );
  const roadmaps: any = {
    frontend: { file: frontendData, title: "Frontend" },
    react: { file: reactData, title: "React" },
    backend: { file: backendData, title: "Backend" },
    devops: { file: devopsData, title: "Devops" },
    dataEngineer: { file: dataEngineeringData, title: "Data Engineer" },
    community: { file: communityData, title: "Comunidade" },
  };

  useEffect(() => {
    const handleMouseMove = (event: { clientX: any; clientY: any }) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (name) {
      setRoadmapName(name);
      setRoadmapData(roadmaps[name].file);
      setRoadmapLevel(roadmaps[name].file[currentLevelIndex]);
    }
  }, [name]);

  useEffect(() => {
    if (roadmapData && roadmapLevel) {
      setCurrentLevelIndex(roadmapData.indexOf(roadmapLevel));
    }
  }, [roadmapLevel]);

  useEffect(() => {
    if (localStorage.getItem("selectedItems")) {
      setSelectedItems(
        JSON.parse(localStorage.getItem("selectedItems") || "") || {}
      );
    }
  }, []);

  useDocumentTitle("Trilha Info - " + roadmaps[name || ""].title);

  // LevelItem Functions START

  function isAllContentRead(label: string, contentLength: number) {
    if (selectedItems) {
      const contentRead = Object.keys(selectedItems).filter(
        (key) => key.endsWith("-" + label) && selectedItems[key] === true
      );
      return contentRead.length === contentLength;
    }

    return false;
  }

  function checkAllContent(label: string, check: boolean) {
    roadmapData?.forEach((level) => {
      level.items.forEach((item) => {
        if (item.label === label) {
          item.children?.forEach((child) => {
            saveRead(child.label + "-" + item.label, check);
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
        emojis: ["🎉", "🎊", "🎈", "🤓"],
      });
    }
  }

  function saveRead(label: string, checked: boolean) {
    let selected = selectedItems;
    if (!selected) {
      selected = {};
    }
    selected[label] = checked;
    setSelectedItems(selected);
    localStorage.setItem("selectedItems", JSON.stringify(selected));

    if (checked) {
      emojisplosion({
        emojiCount: 1,
        uniqueness: 1,
        position: {
          x: mousePos?.x || innerWidth / 2,
          y: mousePos?.y || innerHeight / 2,
        },
        emojis: ["🎉", "🎊", "🎈", "🤓"],
      });
    }
  }

  function isRead(label: string) {
    if (selectedItems) {
      return selectedItems[label];
    }
    return false;
  }
  // LevelItem Functions END

  function handleNextLevel() {
    if (roadmapData && currentLevelIndex < roadmapData.length - 1) {
      setRoadmapLevel(roadmapData[currentLevelIndex + 1]);
      setSelectedItem(undefined);
    }
  }

  function handlePreviousLevel() {
    if (roadmapData && currentLevelIndex >= 1) {
      setRoadmapLevel(roadmapData[currentLevelIndex - 1]);
      setSelectedItem(undefined);
    }
  }

  function handleSelectItem(item: RoadmapItem) {
    setSelectedItem(item);
  }

  function handleNavigateLevel(index: number) {
    if (roadmapData) {
      setRoadmapLevel(roadmapData[index]);
      setSelectedItem(undefined);
    }
  }

  return (
    <MainLayout>
      <div className="m-auto h-full flex flex-col w-11/12">
        <div className="flex justify-end gap-2 mt-8">
          <RoadmapButtons
            buttons={["verticalView"]}
            title={roadmaps[name || ""].title}
            roadmapRef={roadmapRef}
          />
        </div>
        <section
          ref={roadmapRef}
          className="m-auto h-full flex flex-col w-11/12"
        >
          <h1 className="m-auto mt-8 text-center txt-title text-4xl text-yellow xl:hidden">
            {roadmaps[name || ""].title}
          </h1>
          <div className="flex flex-col xl:flex-row">
            <div className="w-full xl:w-1/4 flex-col">
              <div className="flex-col my-8 space-y-4">
                <HorizontalLevelItem
                  checkAllContent={checkAllContent}
                  isAllContentRead={isAllContentRead}
                  levelsQty={roadmapData?.length || 0}
                  roadmapLevel={roadmapLevel}
                  handleSelectItem={handleSelectItem}
                  index={currentLevelIndex}
                  selectedItem={selectedItem}
                />
              </div>
            </div>
            {/* Selected Item Content */}
            <div className="w-full xl:w-2/4 xl:pl-10">
              <h1 className="m-auto my-8 text-center txt-title text-4xl text-yellow hidden xl:block">
                {roadmaps[name || ""].title}
              </h1>
              {!selectedItem && (
                <div className="flex h-full ">
                  <p className="m-auto txt-title text-red">
                    Selecione um Item à esquerda para estudar.
                  </p>
                </div>
              )}
              {selectedItem && (
                <div className="flex flex-col px-4">
                  <h2 className="txt-title text-2xl text-light-orange">
                    {selectedItem.label}
                  </h2>
                  <p className="txt-title text-xl text-light-orange mt-2">
                    {selectedItem.description}
                  </p>
                  <Accordion className="mt-4" allowToggle>
                    {selectedItem?.children?.map((child, index) => {
                      const key = child.label + "-" + selectedItem.label;

                      return (
                        <AccordionItem key={child.label}>
                          <h2 className="font-semibold">
                            <AccordionButton color={"#e9dad5"}>
                              <Box flex="1" textAlign="left">
                                <CheckboxGroup>
                                  <Checkbox
                                    className="my-auto mr-2"
                                    size={"lg"}
                                    isChecked={isRead(key)}
                                    onChange={(e) => {
                                      saveRead(key, e.target.checked);
                                    }}
                                  ></Checkbox>
                                </CheckboxGroup>
                                <span className="text-light-brown txt-title">
                                  {child.label}
                                </span>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            {child.links?.length
                              ? child.links?.map((link, index) => {
                                  return (
                                    <>
                                      <Flex className="my-2">
                                        <a
                                          href={link.url}
                                          target="_blank"
                                          className="text-light-brown hover:underline"
                                        >
                                          {link.label}
                                        </a>
                                        <Spacer />
                                        <Badge
                                          colorScheme={getColorFromContentType(
                                            link.contentType
                                          )}
                                          p={1}
                                          rounded={"md"}
                                          className="h-5"
                                          fontSize="0.6em"
                                          mr="1"
                                          cursor={"default"}
                                        >
                                          <span>
                                            {link.contentType
                                              ? link.contentType
                                              : null}
                                          </span>
                                        </Badge>
                                      </Flex>
                                    </>
                                  );
                                })
                              : "Ainda não possuimos conteúdo."}
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              )}
            </div>
            <div className="w-full xl:w-1/4 xl:pl-10">
              {selectedItem && (
                <Note
                  id={selectedItem?.label || ""}
                  title={selectedItem?.label || ""}
                />
              )}
            </div>
          </div>
          <div className="flex-grow"></div>
          <div className="flex">
            <HorizontalRoadmapFooter
              currentLevelIndex={currentLevelIndex + 1}
              levelQty={roadmapData?.length}
              handleNextLevel={handleNextLevel}
              handlePreviousLevel={handlePreviousLevel}
              handleNavigateLevel={handleNavigateLevel}
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
