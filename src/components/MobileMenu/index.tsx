import { useAuth0 } from '@auth0/auth0-react';
import { FaDiscord, FaGithubSquare, FaNewspaper } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { Drawer, DrawerRoot, DrawerTrigger } from '../Drawer';

export default function MobileMenu() {
  return (
    <DrawerRoot>
      <div className="flex cursor-pointer items-center justify-center md:hidden">
        <DrawerTrigger>
          <div className="m-auto block space-y-2 md:hidden">
            <div className="h-0.5 w-8 bg-light-yellow"></div>
            <div className="h-0.5 w-8 bg-light-yellow"></div>
            <div className="h-0.5 w-8 bg-light-yellow"></div>
          </div>
        </DrawerTrigger>
      </div>
      <HeaderDrawer />
    </DrawerRoot>
  );
}

const HeaderDrawer = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading, logout } = useAuth0();

  return (
    <Drawer position="left">
      {isAuthenticated && (
        <div className="flex items-start justify-start border-b border-b-yellow pb-5 text-yellow">
          <img className="h-10 w-10 rounded-full" src={user?.picture} alt={user?.name} />
          <span className="m-auto ml-2 mr-4 font-title text-base font-bold">{user?.name}</span>
        </div>
      )}
      <ul className="flex-col pt-6">
        <li className="flex">
          <a
            target={'_blank'}
            className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
            href="https://discord.gg/TmneeHgTBp"
            rel="noreferrer"
          >
            <FaDiscord className="m-auto h-7 w-7 " />
            <span className="my-auto ml-1 font-title text-base">Discord</span>
          </a>
        </li>
        <li className="flex">
          <a
            target={'_blank'}
            className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
            href="https://github.com/flaviojmendes/trilhadev"
            rel="noreferrer"
          >
            <FaGithubSquare className="m-auto h-8 w-8 " />
            <span className="my-auto ml-1 font-title text-lg">Github</span>
          </a>
        </li>
        <li className="flex">
          <a
            target={'_blank'}
            className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
            href="https://www.getrevue.co/profile/flaviojmendes"
            rel="noreferrer"
          >
            <FaNewspaper className="m-auto h-8 w-8 " />
            <span className="my-auto ml-1 font-title text-lg">Assine a Newsletter</span>
          </a>
        </li>

        <li className="flex">
          {isAuthenticated && (
            <button
              className="auto m-auto mt-8 rounded-md bg-brown p-2"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          )}
        </li>
        <li className="flex">
          {!isAuthenticated && !isLoading && (
            <button
              className="m-auto mt-8 rounded-md bg-light-brown p-2"
              onClick={() => loginWithRedirect()}
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
    </Drawer>
  );
};
