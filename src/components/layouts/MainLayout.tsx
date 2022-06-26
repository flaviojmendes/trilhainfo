import { FaGithubSquare, FaNewspaper } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { chakra, Link as ChakraLink, useDisclosure } from "@chakra-ui/react";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="container p-2 flex space-x-4 mx-auto">
        <div className="flex-grow"></div> 
          <ChakraLink
            isExternal
            className="mr-0 ml-auto flex"
            textDecoration={"none"}
            href="https://github.com/flaviojmendes/trilhadev"
          >
            <FaGithubSquare className="w-8 h-8 c-red" />
            <span className="my-auto text-lg ml-1 c-red">Github</span>
          </ChakraLink>
         
          <ChakraLink
            isExternal
            className="mr-0 ml-auto flex"
            textDecoration={"none"}
            href="https://www.getrevue.co/profile/flaviojmendes"
          >
            <FaNewspaper className="w-8 h-8 c-blue" />
            <span className="my-auto text-lg ml-1 c-blue">Assine a Newsletter</span>
          </ChakraLink>
        </div>
        <div className="container flex-grow py-1 px-2 mx-auto mt-0 mb-10">
          <Logo />

          {children}
        </div>
        <footer className="text-center pb-4">
          <span className="c-brown">Idealizado por </span>
          <ChakraLink
            isExternal
            color={"#ee8561"}
            href="https://github.com/flaviojmendes"
          >
            flaviojmendes
          </ChakraLink>
          <span className="c-brown"> e mantido pela comunidade.</span>
        </footer>
      </div>
    </>
  );
}
