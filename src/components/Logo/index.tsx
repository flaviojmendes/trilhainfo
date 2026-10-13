import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink className="site-logo" to="/" aria-label="Trilha Info, página inicial">
      <img src="/logo.png" alt="" />
    </NavLink>
  );
}
