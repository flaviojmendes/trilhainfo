import { useAuth0 } from '@auth0/auth0-react';
import { FaDiscord, FaGithubSquare } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import Logo from '../Logo';
import MobileMenu from '../MobileMenu';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export default function Header() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently, loginWithPopup } =
    useAuth0();
  return (
    <header className="mx-auto flex w-full flex-wrap justify-center space-x-0 space-y-2 bg-dark-brown p-2 px-10 xl:px-64">
      <MobileMenu />
      <div className="flex-grow">
        {' '}
        <Logo />
      </div>
      <nav className="hidden md:flex" aria-label="navegação principal">
        <ul className="flex">
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
              href="https://discord.gg/TmneeHgTBp"
              rel="noreferrer"
            >
              <FaDiscord className="m-auto h-10 w-10 " />
            </a>
          </li>
          <li className="flex">
            <a
              target={'_blank'}
              className="my-2 mr-4 flex pr-4 text-yellow hover:text-red"
              href="https://github.com/flaviojmendes/trilhadev"
              rel="noreferrer"
            >
              <FaGithubSquare className="m-auto h-10 w-10 " />
            </a>
          </li>

          <li className="flex">
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
                    className="z-20 m-auto rounded-md bg-brown p-2 shadow-brutalist-red transition-all duration-300 hover:bg-light-orange hover:shadow-brutalist-red-hover"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </li>
          <li className="flex">
            {!isAuthenticated && !isLoading && (
              <div className="group relative m-auto flex h-fit w-fit">
                <button
                  className="z-20 m-auto rounded-md bg-light-brown p-2 font-title shadow-brutalist-red transition-all duration-300 hover:bg-brown hover:shadow-brutalist-red-hover"
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
}
