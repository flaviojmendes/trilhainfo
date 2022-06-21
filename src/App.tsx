import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { data } from "./frontend";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, ChevronUpIcon, InfoIcon } from "@chakra-ui/icons";
import { RoadmapItem } from "./entity/RoadmapItem";
import { FaGithubSquare } from "react-icons/fa";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();

  function triggerItemSelection(item: RoadmapItem) {
    setActiveItem(item);
    onOpen();
  }

  return (
    <>
      <div className="container p-2 flex mx-auto mt-2">
        <Link isExternal className="mr-0 ml-auto flex" textDecoration={'none'} href="https://github.com/flaviojmendes/trilhadev">
          <FaGithubSquare className="w-10 h-10 c-red" />
          <span className="my-auto text-xl ml-2 c-red">Github</span>
        </Link>
      </div>
      <div className="container p-1 mx-auto mt-0 mb-10">
        <h1 className="text-center font-bold text-3xl">
          <span className="c-brown">0</span>
          <span className="c-brown">1</span>
          <span className="c-yellow">0</span>
          <span className="c-yellow">1</span>
         <span className="c-blue">0</span>
          <span className="c-red">Trilha</span>
          <span className="c-brown">0</span>
          <span className="c-brown">1</span>
          <span className="c-blue">0</span>
          <span className="c-blue">0</span>
          <span className="c-yellow">1</span>
        </h1>
        <h1 className="text-center font-bold text-3xl">
          <span className="c-yellow">1</span>
          <span className="c-yellow">1</span>
          <span className="c-blue">0</span>
          <span className="c-blue">1</span>
          <span className="c-blue">1</span>
          <span className="c-brown">0</span>
          <span className="c-brown">0</span>
          <span className="c-red">Info</span>
          <span className="c-yellow">1</span>
          <span className="c-blue">0</span>
          <span className="c-blue">0</span>
          <span className="c-yellow">1</span>
          <span className="c-yellow">1</span>
        </h1>

        <p className="mt-4 text-center font-semibold c-brown">
          Não sabe por onde começar a estudar? Que tal dar uma olhada por aqui?
        </p>
        <p className="mb-4 text-center font-semibold c-brown">
          Lendo de cima pra baixo, cada "caixa" é um assunto a ser estudado.
          Clicando, você verá em mais detalhes o que estudar com links de
          conteúdos gratuitos produzidos por pesoas que dominam a área e te
          ajudarão nessa jornada!
        </p>

        <h2 className="text-center font-bold text-3xl c-yellow mb-10">
          Frontend
        </h2>

        <div className="">
          {data.map((level, index, data) => {
            return (
              <Stack spacing={0}>
                <div className="flex place-content-center">
                  {level.map((item, index, level) => {
                    return (
                      <>
                        <Flex
                          onClick={() => {
                            triggerItemSelection(item);
                          }}
                          rounded={"xl"}
                          className="mx-0 my-0 bg-brown p-2 w-48 text-center cursor-pointer"
                        >
                          <Spacer />
                          <span className="m-auto c-dark-brown font-semibold">
                            {item.label}
                          </span>
                          <Spacer />

                          <InfoIcon m="auto" mr="2" color={"#494443"} />
                        </Flex>
                        {index < level.length - 1 && (
                          <div className="bd-red border-2 border-dashed h-1 my-auto w-[50px]"></div>
                        )}
                      </>
                    );
                  })}
                </div>
                {index < data.length - 1 && (
                  <Center mt={0}>
                    <div className="bd-red border-2 w-1 my-0 h-[30px]"></div>
                  </Center>
                )}
              </Stack>
            );
          })}
        </div>
      </div>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeItem?.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion>
              {activeItem?.children?.map((child, index) => {
                return (
                  <>
                    <AccordionItem>
                      <h2 className="font-semibold">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {child.label}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {child.links?.map((link, index) => {
                          return (
                            <>
                              <Flex className="my-2">
                                <Link href={link.url} isExternal>
                                  {link.label}
                                </Link>
                                <Spacer />
                                <Badge
                                  cursor={"pointer"}
                                  colorScheme="green"
                                  p={1}
                                  rounded={"md"}
                                  className="h-7"
                                >
                                  <CheckIcon mr={2} />
                                  <span>{link.votes ? link.votes : '0'}</span>
                                </Badge>
                              </Flex>
                            </>
                          );
                        })}
                      </AccordionPanel>
                    </AccordionItem>
                  </>
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
    </>
  );
}

export default App;
