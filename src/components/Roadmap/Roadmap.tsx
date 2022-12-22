import ReactGA from "react-ga4";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";

import React, { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { Level, LinkContentType, RoadmapItem } from "../../entity/RoadmapItem";
import LevelItem from "../Level/LevelItem";
import Comment from "../Note/Note";
import { Link, useLocation } from "react-router-dom";
import { emojisplosion } from "emojisplosion";
import Note from "../Note/Note";

type Props = {
  data: Level[];
  title: string;
  name: string;
};

function getColorFromContentType(contentType: LinkContentType | string) {
  switch (contentType) {
    case LinkContentType.LISTEN || "Ouça":
      return "blue";
    case LinkContentType.READ || "Leia":
      return "yellow";
    case LinkContentType.VISIT || "Visite":
      return "purple";
    case LinkContentType.PRACTICE || "Pratique":
      return "green";
    case LinkContentType.WATCH || "Assista":
    default:
      return "orange";
  }
}

export default function Roadmap(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const printRef = useRef(null);
  const { pathname, hash, key } = useLocation();
  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>();
  const [selectedItems, setSelectedItems, remove] = useLocalStorage(
    "selectedItems",
    {} as { [key: string]: boolean }
  );

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
    if (localStorage.getItem("selectedItems")) {
      setSelectedItems(
        JSON.parse(localStorage.getItem("selectedItems") || "") || {}
      );
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const anchorItem = hash.replaceAll("#", "");
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
    props.data.forEach((level) => {
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

  async function handleDownloadImage() {
    ReactGA.event({
      category: "download_roadmap",
      action: "download_" + props.title,
    });

    const element = printRef.current || document.body;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL();
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `trilha${props.title}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  return (
    <>
      <div className="flex">
        <button
          type="button"
          className="border-2 p-1 rounded-md bg-yellow txt-title border-yellow m-auto mr-2 md:mr-10 hover:shadow-md hover:bg-light-orange"
          onClick={handleDownloadImage}
        >
          Baixar meu Roadmap
        </button>
      </div>
      <section ref={printRef}>
        <h2 className="text-center font-bold text-3xl c-yellow my-6 txt-title c-dark-brown">
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

        <Drawer isOpen={isOpen} size={"lg"} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bgColor={"#444140"}>
            <DrawerCloseButton />
            <DrawerHeader>
              <span className="text-light-brown txt-title">
                {activeItem?.label}
              </span>
            </DrawerHeader>

            <DrawerBody>
              <p className="mb-4 text-light-brown txt-title">
                {activeItem?.description}
              </p>
              <Accordion allowToggle>
                {activeItem?.children?.map((child, index) => {
                  const key = child.label + "-" + activeItem.label;

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

              <Note id={activeItem?.label || ""} title={activeItem?.label || ""}/>
            </DrawerBody>

            <DrawerFooter>
              <div className="flex space-x-4">
                <a
                  className="twitter-share-button bg-blue rounded-md text-center font-semibold px-2 py-2 align-middle"
                  href={`https://twitter.com/intent/tweet?text=Vem estudar ${
                    activeItem?.label
                  } comigo na Trilha Info.&url=https://trilha.info/roadmap/${
                    props.name
                  }${encodeURIComponent("#" + activeItem?.label || "")}`}
                >
                  Compartilhar no Twitter
                </a>
                <Button colorScheme="yellow" mr={3} onClick={onClose}>
                  Fechar
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </>
  );
}
