import { NavLink } from "react-router-dom";
import { chakra, Link as ChakraLink, useDisclosure } from "@chakra-ui/react";
import MainLayout from "../components/layouts/MainLayout";

export default function HomePage() {
  const Link = chakra(NavLink);

  return (
    <>
      <MainLayout>
        <h2 className="text-center my-6 txt-handwritten text-3xl c-yellow">
          Escolha seu destino:
        </h2>

        <div className="flex flex-wrap items-stretch md:space-x-10 space-y-10 md:space-y-0 justify-center">
          {/* Frontend */}
          <Link
            className="bd-handwritten bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit hover:bg-white py-3"
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
          <div className="relative bd-handwritten bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit py-3">
            <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
              Backend
            </h3>
            <p className="text-justify mx-5">
              Back-end se relaciona com o que está por trás das aplicações
              desenvolvidas na programação. Ou seja, tudo que dá estrutura e
              apoio às ações do usuário da máquina é chamado de back-end.
            </p>

            <h2 className="absolute rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-3xl text-center bg-black c-red font-bold rotate-45 mr-0 p-2">
              Em Breve
            </h2>
          </div>

          {/* Backend */}
          <div className="relative bd-handwritten bg-brown md:w-1/3 lg:w-1/4 w-full min-h-fit py-3">
            <h3 className="text-center text-3xl txt-handwritten mb-2 c-dark-brown">
              Devops
            </h3>
            <p className="text-justify mx-5">
              Especialista em DevOps (Desenvolvimento e Operações, de maneira
              simplificada) é a pessoa que atua na integração entre as equipes de
              desenvolvimento de software, especialmente nas áreas de
              desenvolvimento e operações, integrando e monitorando suas
              atividades para buscar um desempenho mais otimizado e
              simplificado.
            </p>

            <h2 className="absolute rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-3xl text-center bg-black c-red font-bold rotate-45 mr-0 p-2">
              Em Breve
            </h2>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
