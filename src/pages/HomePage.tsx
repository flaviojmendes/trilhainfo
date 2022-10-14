import { NavLink } from "react-router-dom";
import {
  Button,
  chakra,
  Link as ChakraLink,
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
        <h2 className="text-center my-6 txt-handwritten text-3xl c-yellow">
          Tudo o que você precisa saber para ser:
        </h2>

        <div className="flex flex-wrap items-stretch md:space-x-10 space-y-10 md:space-y-0 justify-center px-2">
          {/* Frontend */}
          <Link
            className="bd-handwritten bd-red bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3"
            to={"/roadmap/frontend"}
          >
            <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
              Frontend
            </h3>
            <p className="text-justify mx-5">
              A pessoa que desenvolve front-end é responsável pela experiência
              do usuário dentro de uma aplicação web. É ela quem vai desenhar e
              desenvolver as páginas com as quais, posteriormente, o usuário irá
              interagir.
            </p>
          </Link>

          {/* Backend */}
          <Link
            className="bd-handwritten bd-red bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3"
            to={"/roadmap/backend"}
          >
            <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
              Backend
            </h3>
            <p className="text-justify mx-5">
              Back-end se relaciona com o que está por trás das aplicações
              desenvolvidas na programação. Ou seja, tudo que dá estrutura e
              apoio às ações do usuário da máquina é chamado de back-end.
            </p>
          </Link>

          {/* Devops */}
          <Link
            className="bd-handwritten bd-red bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3"
            to={"/roadmap/devops"}
          >
            <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
              Devops
            </h3>
            <p className="text-justify mx-5">
              Especialista em DevOps (Desenvolvimento e Operações, de maneira
              simplificada) é a pessoa que atua na integração entre as equipes
              de desenvolvimento de software, especialmente nas áreas de
              desenvolvimento e operações, integrando e monitorando suas
              atividades para buscar um desempenho mais otimizado e
              simplificado.
            </p>
          </Link>

          {/* Backend */}
          <Link
            className="bd-handwritten bd-red bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3"
            to={"/roadmap/react"}
          >
            <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
              React
            </h3>
            <p className="text-justify mx-5">
              React é uma biblioteca JavaScript declarativa, eficiente e flexível
              criada pelo Facebook em 2011 para desenvolver aplicações
              front-end, ou seja, interfaces de usuário (UIs).
            </p>
          </Link>
        </div>

        <CheatSheets />
        <UserArea />

        <div className="flex flex-col items-stretch justify-center">
          <h2 className="text-center my-6 txt-handwritten text-3xl c-yellow">
            Open Source
          </h2>
          <div className="container text-yellow mx-auto px-4 text-justify">
            <p className="my-2">
              A Trilha Info é um projeto{" "}
              <span className="font-semibold text-red">
                <a
                  target={"_blank"}
                  href="https://github.com/flaviojmendes/trilhainfo"
                >
                  Open Source
                </a>
              </span>{" "}
              que nasceu em Junho/2022 com o objetivo de agregar e organizar
              conteúdos gratuitos em português para pessoas que querem ingressar
              na área de Tecnologia.
            </p>
            <p className="my-8">
              A motivação em criar esse aplicativo é por acreditar que a
              educação e o conhecimento devem ser democráticos. Qualquer pessoa
              deveria ter acesso aos assuntos que se interessa para que garanta
              um futuro cada vez mais próspero.
            </p>
            <p className="my-8">
              Portanto, se você também acredita nisso compartilhe para que o
              conhecimento chegue cada vez mais longe.
            </p>
          </div>
          <div className="w-full mt-4 flex justify-center">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=flaviojmendes&repo=trilhainfo&type=star&count=true&size=large&v=2"
              scrolling="0"
              width="170"
              height="30"
              title="Trilha Info"
            ></iframe>
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={handleModalClosed} size="5xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Aoba! 🎉</ModalHeader>
            <ModalCloseButton />
            <ModalBody px="12">
              <p>
                A nova versão da <strong>Trilha Info</strong> está no ar!
              </p>
              <p>
                Agora você pode logar no Trilha Info com sua conta do Google e
                criar seus próprios roadmaps através do editor.
              </p>

              <p>Para isso basta:</p>

              <ol className="list-decimal">
                <li>
                  No canto superior, clique em{" "}
                  <span className="font-bold">Log In</span>
                </li>
                <li>
                  Se autentique pelo <span className="font-bold">Google</span>
                </li>
                <li>
                  Abaixo dos Roadmaps da Trilha Info, clique no botão{" "}
                  <span className="font-bold">+ Novo Roadmap</span>
                </li>
                <li>
                  Siga esse
                  <a
                    className="font-bold c-red"
                    target={"_blank"}
                    href="https://trilha.info/roadmap/view/d86cd687-2e42-4e18-bf03-a6f878b58844"
                  >
                    {" "}
                    guia
                  </a>
                  .
                </li>
                <li>Pronto! Crie e compartilhe nas suas redes sociais! 🎊</li>
              </ol>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={handleModalClosed}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MainLayout>
    </>
  );
}
