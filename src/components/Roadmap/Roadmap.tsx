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
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";

import React, { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import { Level, LinkContentType, RoadmapItem } from "../../entity/RoadmapItem";
import LevelItem from "../Level/LevelItem";

type Props = {
  data: Level[];
  title: string;
};

function getColorFromContentType(contentType: LinkContentType | string) {
  switch (contentType) {
    case LinkContentType.LISTEN || 'Ouça':
      return "blue";
    case LinkContentType.READ || 'Leia':
      return "yellow";
    case LinkContentType.VISIT || 'Visite':
      return "purple";    
    case LinkContentType.PRACTICE || 'Pratique':
      return "green";
    case LinkContentType.WATCH || 'Assista':
    default:
      return "orange";
  }
}

export default function Roadmap(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const printRef = useRef(null);

  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();
  const [selectedItems, setSelectedItems, remove] = useLocalStorage(
    "selectedItems",
    {} as { [key: string]: boolean }
  );

  useEffect(() => {
    if (localStorage.getItem("selectedItems")) {
      setSelectedItems(
        JSON.parse(localStorage.getItem("selectedItems") || "") || {}
      );
    }
  }, []);

  function saveRead(label: string, checked: boolean) {
    let selected = selectedItems;
    if (!selected) {
      selected = {};
    }
    selected[label] = checked;
    setSelectedItems(selected);
    localStorage.setItem("selectedItems", JSON.stringify(selected));
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
        (key) => key.includes("-" + label) && selectedItems[key] === true
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
          className="border-2 p-1 rounded-md bg-yellow txt-handwritten bd-handwritten bd-yellow m-auto mr-1 hover:shadow-md"
          onClick={handleDownloadImage}
        >
          Baixar meu Roadmap
        </button>
      </div>
      <div ref={printRef}>
        <h2 className="text-center font-bold text-3xl c-yellow my-6 txt-handwritten c-dark-brown">
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

        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="bd-handwritten">
            <ModalHeader>{activeItem?.label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p className="mb-4">{activeItem?.description}</p>
              <Accordion allowToggle>
                {activeItem?.children?.map((child, index) => {
                  const key = child.label + "-" + activeItem.label;

                  return (
                    <AccordionItem key={child.label}>
                      <h2 className="font-semibold">
                        <AccordionButton>
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
                            {child.label}
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
                                    <Link href={link.url} isExternal>
                                      {link.label}
                                    </Link>
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
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
