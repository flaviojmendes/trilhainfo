import { NavLink } from "react-router-dom";
import {
  Button,
  chakra,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import MainLayout from "../components/layouts/MainLayout";
import UserArea from "../components/UserArea/UserArea";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import CheatSheets from "../components/CheatSheets/CheatSheets";
import OpenSource from "../components/OpenSource/OpenSource";

const cookies = new Cookies();

export default function HomePage() {
  const Link = chakra(NavLink);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // if (!cookies.get("new_release")) {
    //   onOpen();
    // }
  });

  function handleModalClosed() {
    cookies.set("new_release", true);
    onClose();
  }

  return (
    <>
      <MainLayout>
        <h2 className="text-center txt-title my-6  text-3xl c-yellow">
          Tudo o que você precisa saber para ser:
        </h2>

        <section className="flex flex-wrap items-stretch space-y-10 pb-10 md:space-y-0 justify-center px-2 gap-5">
          {/* Frontend */}
          <Link
            className="bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3 rounded-md"
            to={"/roadmap/frontend"}
          >
            <img
              className="w-1/2 mx-auto"
              src={new URL(`../assets/frontend.png`, import.meta.url).href}
            />
            <h3 className="text-center text-3xl txt-title mb-2 c-dark-brown">
              Frontend
            </h3>
            <p className="m-6">
              A pessoa que desenvolve front-end é responsável pela experiência
              do usuário dentro de uma aplicação web. É ela quem vai desenhar e
              desenvolver as páginas com as quais, posteriormente, o usuário irá
              interagir.
            </p>
          </Link>

          {/* Backend */}
          <Link
            className="bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3 rounded-md"
            to={"/roadmap/backend"}
          >
            <img
              className="w-1/2 mx-auto"
              src={new URL(`../assets/backend.png`, import.meta.url).href}
            />
            <h3 className="text-center text-3xl txt-title mb-2 c-dark-brown">
              Backend
            </h3>
            <p className="m-6">
              Back-end se relaciona com o que está por trás das aplicações
              desenvolvidas na programação. Ou seja, tudo que dá estrutura e
              apoio às ações do usuário da máquina é chamado de back-end.
            </p>
          </Link>

          {/* Devops */}
          <Link
            className="bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3 rounded-md"
            to={"/roadmap/devops"}
          >
            {" "}
            <img
              className="w-1/2 mx-auto"
              src={new URL(`../assets/devops.png`, import.meta.url).href}
            />
            <h3 className="text-center text-3xl txt-title mb-2 c-dark-brown">
              Devops
            </h3>
            <p className="m-6">
              Especialista em DevOps (Desenvolvimento e Operações, de maneira
              simplificada) é a pessoa que atua na integração entre as equipes
              de desenvolvimento de software, especialmente nas áreas de
              desenvolvimento e operações, integrando e monitorando suas
              atividades para buscar um desempenho mais otimizado e
              simplificado.
            </p>
          </Link>

          {/* React */}
          <Link
            className="bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3 rounded-md"
            to={"/roadmap/react"}
          >
            <img
              className="w-1/2 mx-auto p-4"
              src={new URL(`../assets/react.svg`, import.meta.url).href}
            />
            <h3 className="text-center text-3xl txt-title mb-2 c-dark-brown">
              React
            </h3>
            <p className="m-6">
              React é uma biblioteca JavaScript declarativa, eficiente e
              flexível criada pelo Facebook em 2011 para desenvolver aplicações
              front-end, ou seja, interfaces de usuário (UIs).
            </p>
          </Link>
        </section>

        <UserArea />
        <CheatSheets />
        <OpenSource />
      </MainLayout>
    </>
  );
}
