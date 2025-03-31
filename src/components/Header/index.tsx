import { useAuth0 } from '@auth0/auth0-react';
import { FaDiscord, FaGithubSquare, FaInstagram } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import Logo from '../Logo';
import MobileMenu from '../MobileMenu';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { decode } from 'base-64';
import { useEffect } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

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

          <li className="flex">
            {isAuthenticated && (
              <>
                <div className="relative m-auto flex h-fit w-fit">
                  <div className="group mr-2 flex">
                    <div className="flex cursor-pointer rounded-sm border-2  border-primary text-primary hover:bg-primary hover:text-white">
                      <span className="m-auto ml-2 mr-1 font-title ">{user?.name}</span>
                      <MdArrowDropDown className="my-auto h-6 w-6 " />
                    </div>
                    {/* A dropdown */}
                    <div className="absolute right-20 top-10 z-10 hidden rounded-sm border-2 border-primary bg-dark-brown group-hover:block">
                      <a
                        className="block px-4 py-2 text-primary hover:bg-primary-hover hover:text-white"
                        href="/profile"
                      >
                        Dashboard
                      </a>
                    </div>
                  </div>
                  <button
                    className="z-20 rounded-sm bg-primary p-2 font-title duration-100 hover:bg-primary-hover hover:shadow-primary-white"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </li>
          <li className="flex">
            {/* {!isAuthenticated && !isLoading && (
              <div className="relative flex m-auto group h-fit w-fit">
                <button
                  className="z-20 p-2 m-auto duration-100 rounded-sm bg-primary font-title hover:shadow-primary-white"
                  onClick={() => handleAuth()}
                >
                  Log In
                </button>
              </div>
            )} */}
            {isLoading && (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#E1047B"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
                wrapperClass="m-auto"
              />
            )}
          </li>
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
