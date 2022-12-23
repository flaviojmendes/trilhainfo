import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaDiscord, FaGithubSquare, FaNewspaper } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

export default function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    isLoading,
    logout,
    loginWithPopup,
  } = useAuth0();
  return (
    <>
      <div className="space-y-2 m-auto block md:hidden" onClick={onOpen}>
        <div className="w-8 h-0.5 bg-yellow"></div>
        <div className="w-8 h-0.5 bg-yellow"></div>
        <div className="w-8 h-0.5 bg-yellow"></div>
      </div>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={"#494443"}>
          <DrawerCloseButton color={"#eabc54"}/>
          <DrawerHeader display={"flex"}>
            {isAuthenticated && (
              <>
                <div className="w-200 flex text-yellow align-middle">
                  <img
                    className="m-auto rounded-full w-10 h-10"
                    src={user?.picture}
                    alt={user?.name}
                  />
                  <span className="m-auto ml-2 mr-4 text-base txt-title">
                    {user?.name}
                  </span>
                </div>
              </>
            )}
          </DrawerHeader>

          <DrawerBody>
            {isAuthenticated && <hr className="mb-4 m-auto border-yellow" />}
            <ul className="flex-col">
              <li className="flex">
                <a
                  target={"_blank"}
                  className="flex text-yellow hover:text-red pr-4 mr-4 my-2"
                  href="https://discord.gg/TmneeHgTBp"
                >
                  <FaDiscord className="m-auto w-7 h-7 " />
                  <span className="my-auto text-base ml-1 txt-title">
                    Discord
                  </span>
                </a>
              </li>
              <li className="flex">
                <a
                  target={"_blank"}
                  className="flex text-yellow hover:text-red pr-4 mr-4 my-2"
                  href="https://github.com/flaviojmendes/trilhadev"
                >
                  <FaGithubSquare className="m-auto w-8 h-8 " />
                  <span className="my-auto text-lg ml-1 txt-title">Github</span>
                </a>
              </li>
              <li className="flex">
                <a
                  target={"_blank"}
                  className="flex text-yellow hover:text-red pr-4 mr-4 my-2"
                  href="https://www.getrevue.co/profile/flaviojmendes"
                >
                  <FaNewspaper className="m-auto w-8 h-8 " />
                  <span className="my-auto text-lg ml-1 txt-title">
                    Assine a Newsletter
                  </span>
                </a>
              </li>

              <li className="flex">
                {isAuthenticated && (
                  <Button
                    margin={"auto"}
                    mt={8}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </Button>
                )}
              </li>
              <li className="flex">
                {!isAuthenticated && !isLoading && (
                  <Button
                    margin={"auto"}
                    mt={8}
                    onClick={() => loginWithRedirect()}
                  >
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
              </li>
            </ul>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
