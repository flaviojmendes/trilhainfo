import { useAuth0 } from '@auth0/auth0-react';
import { FaDiscord, FaGithubSquare, FaNewspaper } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { Drawer, DrawerRoot, DrawerTrigger } from '../Drawer';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
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
  const { loginWithPopup, isAuthenticated, user, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

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
            className="my-2 mr-4 flex pr-4 text-primary"
            href="https://discord.gg/TmneeHgTBp"
            rel="noreferrer"
          >
            <FaDiscord className="m-auto h-7 w-7 " />
            <span className="my-auto ml-1 font-title text-xl">Discord</span>
          </a>
        </li>
        <li className="flex">
          <a
            target={'_blank'}
            className="my-2 mr-4 flex pr-4 text-primary "
            href="https://github.com/flaviojmendes/trilhadev"
            rel="noreferrer"
          >
            <FaGithubSquare className="m-auto h-8 w-8 " />
            <span className="my-auto ml-1 font-title text-xl">Github</span>
          </a>
        </li>
        <li className="flex">
          <a
            target={'_blank'}
            className="my-2 mr-4 flex pr-4 text-xl text-primary"
            href="https://www.getrevue.co/profile/flaviojmendes"
            rel="noreferrer"
          >
            <FaNewspaper className="m-auto h-8 w-8 " />
            <span className="my-auto ml-1 font-title text-lg">Assine a Newsletter</span>
          </a>
        </li>

        <li className="flex">
          {isAuthenticated && (
            <div className="group relative m-auto flex h-fit w-fit">
              <button
                className="auto z-20 m-auto rounded-md bg-brown p-2 hover:bg-light-orange"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
              <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-red group-hover:bg-red"></div>
            </div>
          )}
        </li>
        {/* <li className="flex">
          {!isAuthenticated && !isLoading && (
            <div className="group relative m-auto flex h-fit w-fit">
              <button
                className="z-20 m-auto rounded-md bg-primary p-2 font-title hover:bg-primary-hover duration-100 hover:shadow-primary-white"
                onClick={() => handleAuth()}
              >
                Log In
              </button>
            </div>
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
        </li> */}
      </ul>
    </Drawer>
  );

  async function handleAuth() {
    (async () => {
      await loginWithPopup();

      const token = await getAccessTokenSilently({
        audience: 'TrilhaInfoApi',
      });
      cookies.set('api_token', `Bearer ${token}`);

      try {
        await axios.get(import.meta.env.VITE_API_URL + '/user/' + user?.nickname, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('api_token'),
          },
        });
      } catch (e) {
        await axios.post(
          import.meta.env.VITE_API_URL + '/user' || '',
          {
            user_login: user?.nickname,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookies.get('api_token'),
            },
          },
        );
      }
      document.location.href = '/';
    })();
  }
};
