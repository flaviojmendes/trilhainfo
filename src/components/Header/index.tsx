import { useAuth0 } from '@auth0/auth0-react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo';
import MobileMenu from '../MobileMenu';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { decode } from 'base-64';
import { MdArrowDropDown } from 'react-icons/md';

const cookies = new Cookies();

export const siteLinks = [
  { label: 'Trilhas', href: '/#trilhas' },
  { label: 'Guias', to: '/guias' },
  { label: 'Comunidade', to: '/roadmap/community' },
];

export default function Header() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently, loginWithPopup } =
    useAuth0();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Logo />
        <nav className="site-nav" aria-label="navegação principal">
          <ul>
            {siteLinks.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <NavLink to={link.to}>{link.label}</NavLink>
                ) : (
                  <a href={link.href}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header-actions">
          <a
            target="_blank"
            className="site-icon-link"
            href="https://github.com/flaviojmendes/trilhainfo"
            rel="noreferrer"
            aria-label="Github"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <a
            target="_blank"
            className="site-icon-link"
            href="https://instagram.com/trilhainfo"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram aria-hidden="true" />
          </a>
          {isAuthenticated && (
            <div className="site-user">
              <Link to="/profile" className="site-user-button">
                {user?.picture && <img src={user.picture} alt="" />}
                <span>{user?.name}</span>
                <MdArrowDropDown aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="site-ghost-button"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Sair
              </button>
            </div>
          )}
          {isLoading && (
            <ThreeDots
              height="24"
              width="24"
              radius="9"
              color="#FF83C5"
              ariaLabel="Carregando sessão"
              wrapperStyle={{}}
              visible={true}
              wrapperClass="m-auto"
            />
          )}
        </div>
        <MobileMenu />
      </div>
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
