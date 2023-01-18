import {
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "../Header";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header/>
        <main className="w-full flex-grow mx-auto mt-0">
          {children}
        </main>
        <footer className="text-center py-4 w-full bg-dark-brown select-none px-10 xl:px-64 text-red">
          <span className="c-brown">Idealizado por </span>
          <ChakraLink
            isExternal
            href="https://github.com/flaviojmendes"
          >
            flaviojmendes
          </ChakraLink>
          <span className="c-brown">
            {" "}
            e mantido pela{" "}
            <Link to={"/roadmap/community"} className="text-red hover:underline">
              comunidade
            </Link>
            . 
          </span>
        </footer>
      </div>
    </>
  );
}
