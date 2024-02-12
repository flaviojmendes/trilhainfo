import { useAuth0 } from '@auth0/auth0-react';
import { FaDiscord, FaGithubSquare, FaInstagram } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import Logo from '../Logo';
import MobileMenu from '../MobileMenu';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { decode } from 'base-64';
import { useEffect } from 'react';

const cookies = new Cookies();

export default function Header() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently, loginWithPopup } =
    useAuth0();

  return (
    <header className="fixed z-30 mx-auto flex min-h-[80px] w-full flex-wrap justify-center space-x-0 space-y-2 bg-menu-background bg-opacity-10 px-10 backdrop-blur-[30px] xl:px-64">
      <div className="flex flex-grow">
        {' '}
        <Logo />
      </div>
      <MobileMenu />
      <nav className="hidden md:flex" aria-label="navegação principal">
        <ul className="flex">
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-primary hover:text-primary-shadow"
              href="https://discord.gg/TmneeHgTBp"
              rel="noreferrer"
              aria-label="Discord"
            >
              <FaDiscord className="m-auto h-10 w-10 " />
            </a>
          </li>
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-primary hover:text-primary-shadow"
              href="https://github.com/flaviojmendes/trilhadev"
              rel="noreferrer"
              aria-label="Github"
            >
              <FaGithubSquare className="m-auto h-10 w-10 " />
            </a>
          </li>
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-primary hover:text-primary-shadow"
              href="https://instagram.com/trilhainfo"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="m-auto h-10 w-10 " />
            </a>
          </li>

          {/* <li className="flex">
            {isAuthenticated && (
              <>
                <div className="w-200 flex align-middle text-yellow">
                  <img
                    className="m-auto h-10 w-10 rounded-full"
                    src={user?.picture}
                    alt={user?.name}
                  />
                  <span className="m-auto ml-2 mr-4 font-title text-base">{user?.name}</span>
                </div>
                <div className="group relative m-auto flex h-fit w-fit">
                  <button
                    className="z-20 m-auto rounded-sm bg-brown p-2 hover:bg-light-orange"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                  <div className="absolute -bottom-1 -right-1 left-1 top-1 z-10 rounded-sm bg-red group-hover:bg-red"></div>
                </div>
              </>
            )}
          </li>
          <li className="flex">
            {!isAuthenticated && !isLoading && (
              <div className="group relative m-auto flex h-fit w-fit">
                <button
                  className="z-20 m-auto rounded-sm bg-primary p-2 font-title duration-100 hover:shadow-primary-white"
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
      </nav>
    </header>
  );

  async function handleAuth() {
    (async () => {
      await loginWithPopup();

      const token = await getAccessTokenSilently({
        audience: 'TrilhaInfoApi',
      });
      cookies.set('api_token', `Bearer ${token}`);

      console.log(`Token ${token}`);

      const base64Payload = token.split('.')[1];
      const payload = decode(base64Payload);
      const email = JSON.parse(payload.toString())['https://trilha.info/email'];

      try {
        await axios.get(import.meta.env.VITE_API_URL + '/users/' + email, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('api_token'),
          },
        });
      } catch (e) {
        await axios.post(
          import.meta.env.VITE_API_URL + '/users/' || '',
          {
            login: email,
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
}
