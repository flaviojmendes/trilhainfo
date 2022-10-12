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

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  return (
    <>
      <div className="flex flex-col h-screen">
      <div className="bg-blue py-2 text-center text-xs">Ajudar a atualizar Trilha Info é uma excelente oportunidade para você participar da <a className="c-red font-semibold" target="_blank" href="https://hacktoberfest.com">Hacktoberfest. 👾</a></div>
        <div className="w-full p-2 flex flex-wrap space-x-0 space-y-2 mx-auto bg-[#2A2827] shadow-md">
          <div className="flex-grow">
            {" "}
            <Logo />
          </div>
          <div className="flex">
            <a
              target={"_blank"}
              className="flex border-r-2 border-r-yellow text-yellow hover:text-red pr-4 mr-4"
              href="https://github.com/flaviojmendes/trilhadev"
            >
              <FaGithubSquare className="m-auto w-8 h-8 " />
              <span className="my-auto text-lg ml-1  hidden md:block">
                Github
              </span>
            </a>
            <a
              target={"_blank"}
              className="flex border-r-2 border-r-yellow text-yellow hover:text-red pr-4 mr-4"
              href="https://www.getrevue.co/profile/flaviojmendes"
            >
              <FaNewspaper className="m-auto w-8 h-8 " />
              <span className="my-auto text-lg ml-1 hidden md:block">
                Assine a Newsletter
              </span>
            </a>

            
            {isAuthenticated && (
              <>
                <div className="w-200 flex text-yellow align-middle">
                  <img
                    className="m-auto rounded-full w-10 h-10"
                    src={user?.picture}
                    alt={user?.name}
                  />
                  <span className="m-auto mx-4">{user?.name}</span>
                </div>
                <Button
                  margin={"auto"}
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              </>
            )}

            {!isAuthenticated && !isLoading && (
              <Button margin={"auto"} onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            )}
            {isLoading && (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#d56a47"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            )}
            
          </div>
        </div>
        <div className="w-full flex-grow py-1 mx-auto mt-0 mb-10">
          {children}
        </div>
        <footer className="text-center py-4 w-full bg-dark-brown">
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
            . Esse app foi inspirado em <a style={{ color: "#ee8561" }} target="_blank" href={"https://roadmap.sh"}>
              roadmap.sh
            </a>
            
          </span>
        </footer>
      </div>
    </>
  );
}
