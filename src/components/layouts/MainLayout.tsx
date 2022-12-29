import { FaDollarSign, FaGithubSquare, FaNewspaper } from "react-icons/fa";
import Logo from "../Logo/Logo";
import {
  Button,
  chakra,
  Icon,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";
import Header from "../Header/Header";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header/>
        <main className="w-full flex-grow py-1 mx-auto mt-0 mb-10">
          {children}
        </main>
        <footer className="text-center py-4 w-full bg-dark-brown select-none">
          <span className="c-brown">Idealizado por </span>
          <ChakraLink
            isExternal
            color={"#ee8561"}
            href="https://github.com/flaviojmendes"
          >
            flaviojmendes
          </ChakraLink>
          <span className="c-brown">
            {" "}
            e mantido pela{" "}
            <Link style={{ color: "#ee8561" }} to={"/roadmap/community"}>
              comunidade
            </Link>
            . Esse app foi inspirado em{" "}
            <a
              style={{ color: "#ee8561" }}
              target="_blank"
              href={"https://roadmap.sh"}
            >
              roadmap.sh
            </a>
          </span>
        </footer>
      </div>
    </>
  );
}
