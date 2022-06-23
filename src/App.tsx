import React, { useState } from "react";
import "./App.css";
import Logo from './components/Logo/Logo'
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
import { CheckIcon, InfoIcon } from "@chakra-ui/icons";
import { RoadmapItem } from "./entity/RoadmapItem";
import { FaGithubSquare } from "react-icons/fa";
import Level from "./components/Level/Level";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = React.useState<RoadmapItem>();

  return (
    <>
      <div className="container p-2 flex mx-auto mt-2">
        <Link isExternal className="mr-0 ml-auto flex" textDecoration={'none'} href="https://github.com/flaviojmendes/trilhadev">
          <FaGithubSquare className="w-8 h-8 c-red" />
          <span className="my-auto text-lg ml-1 c-red">Github</span>
        </Link>
      </div>
      <div className="container p-1 mx-auto mt-0 mb-10">
        <Logo />

        <p className="mt-4 text-center font-semibold c-brown">
          Não sabe por onde começar a estudar? Que tal dar uma olhada por aqui?
        </p>
        <p className="mb-4 text-center font-semibold c-brown">
          Lendo de cima pra baixo, cada "caixa" é um assunto a ser estudado.
          Clicando, você verá em mais detalhes o que estudar com links de
          conteúdos gratuitos produzidos por pesoas que dominam a área e te
          ajudarão nessa jornada!
        </p>

        <h2 className="text-center font-bold text-3xl c-yellow mb-1 txt-handwritten">
          Frontend
        </h2>

        <div>
          {data.map((level, index, data) => {
            return (
              <Level level={level} index={index} levelsQty={data.length} onOpen={onOpen} setActiveItem={setActiveItem}/>
            );
          })}
        </div>
      </div>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  className="bd-handwritten">
          <ModalHeader>{activeItem?.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="mb-4">{activeItem?.description}</p>
            <Accordion allowToggle>
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
