import { useAuth0 } from '@auth0/auth0-react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '../Drawer';

const links = [
  { label: 'Trilhas', href: '/#trilhas' },
  { label: 'Guias', to: '/guias' },
];

export default function MobileMenu() {
  return (
    <DrawerRoot>
      <DrawerTrigger aria-label="Abrir menu principal" className="site-menu-trigger">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </DrawerTrigger>
      <HeaderDrawer />
    </DrawerRoot>
  );
}

const HeaderDrawer = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Drawer position="left">
      <DrawerTitle className="sr-only">Menu principal</DrawerTitle>
      <DrawerDescription className="sr-only">
        Navegação e links da comunidade Trilha Info.
      </DrawerDescription>
      <div className="mobile-menu">
        <img className="mobile-menu-logo" src="/logo.png" alt="Trilha Info" />
        {isAuthenticated && (
          <div className="mobile-menu-user">
            <img src={user?.picture} alt="" />
            <span>{user?.name}</span>
          </div>
        )}
        <nav aria-label="Menu principal">
          <ul className="mobile-menu-links">
            {links.map((link) => (
              <li key={link.label}>
                <DrawerClose asChild>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </DrawerClose>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="mobile-menu-social">
          <li>
            <a target="_blank" href="https://github.com/flaviojmendes/trilhainfo" rel="noreferrer">
              <FaGithub aria-hidden="true" /> Github
            </a>
          </li>
          <li>
            <a target="_blank" href="https://instagram.com/trilhainfo" rel="noreferrer">
              <FaInstagram aria-hidden="true" /> Instagram
            </a>
          </li>
        </ul>
      </div>
    </Drawer>
  );
};
