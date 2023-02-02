import { useAuth0 } from "@auth0/auth0-react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FaDiscord, FaGithubSquare, FaNewspaper } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "universal-cookie";


const cookies = new Cookies();

export default function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    loginWithPopup,
    getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth0();
  return (
    <div className="flex md:hidden justify-center items-center">
      <div className="space-y-2 m-auto block md:hidden" onClick={onOpen}>
        <div className="w-8 h-0.5 bg-light-yellow"></div>
        <div className="w-8 h-0.5 bg-light-yellow"></div>
        <div className="w-8 h-0.5 bg-light-yellow"></div>
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
                  <span className="m-auto ml-2 mr-4 text-base font-title">
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
                  <span className="my-auto text-base ml-1 font-title">
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
                  <span className="my-auto text-lg ml-1 font-title">Github</span>
                </a>
              </li>
              <li className="flex">
                <a
                  target={"_blank"}
                  className="flex text-yellow hover:text-red pr-4 mr-4 my-2"
                  href="https://www.getrevue.co/profile/flaviojmendes"
                >
                  <FaNewspaper className="m-auto w-8 h-8 " />
                  <span className="my-auto text-lg ml-1 font-title">
                    Assine a Newsletter
                  </span>
                </a>
              </li>

              <li className="flex">
                {isAuthenticated && (
                  <button
                    className="auto p-2 rounded-md m-auto mt-8 bg-brown"
                    
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                )}
              </li>
              <li className="flex">
                {!isAuthenticated && !isLoading && (
                  <button
                    className="m-auto mt-8 bg-light-brown p-2 rounded-md"
                    onClick={() => handleAuth()}
                  >
                    Log In
                  </button>
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
    </div>
  );

  async function handleAuth() {
    (async () => {
      const authResult = await loginWithPopup();
      const token = await getAccessTokenSilently({
        audience: "TrilhaInfoApi",
      });
      cookies.set("api_token", `Bearer ${token}`);

      try {
        await axios.get(
          import.meta.env.VITE_API_URL + "/user/" + user?.nickname,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );
      } catch (e) {
        await axios.post(
          import.meta.env.VITE_API_URL + "/user" || "",
          {
            user_login: user?.nickname,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          }
        );
      }
      document.location.href = "/";
    })();
  }
}
