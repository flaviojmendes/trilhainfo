import { useAuth0 } from "@auth0/auth0-react";
import { FaDiscord, FaGithubSquare } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    isLoading,
    logout,
    loginWithPopup,
  } = useAuth0();
  return (
    <header className="w-full p-2 flex flex-wrap justify-center space-x-0 space-y-2 mx-auto bg-dark-brown px-10 xl:px-64">
      <MobileMenu />
      <div className="flex-grow">
        {" "}
        <Logo />
      </div>
      <nav className="hidden md:flex" aria-label="navegação principal">
        <ul className="flex">
          <li className="flex">
            <a
              target={"_blank"}
              className="flex text-yellow hover:text-red pr-4 mr-4 my-2"
              href="https://discord.gg/TmneeHgTBp"
            >
              <FaDiscord className="m-auto w-10 h-10 " />
            </a>
          </li>
          <li className="flex">
            <a
              target={"_blank"}
              className="flex text-yellow hover:text-red pr-4 mr-4 my-2"
              href="https://github.com/flaviojmendes/trilhadev"
            >
              <FaGithubSquare className="m-auto w-10 h-10 " />
            </a>
          </li>
         

          <li className="flex">
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
                <button className="m-auto p-2 rounded-md bg-brown"
                  
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </button>
              </>
            )}
          </li>
          <li className="flex">
            {!isAuthenticated && !isLoading && (
              <button className="m-auto bg-light-brown hover:bg-brown p-2 rounded-md font-title" onClick={() => loginWithRedirect()}>
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
      </nav>
    </header>
  );
}
