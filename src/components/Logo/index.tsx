import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to="/">
      <img className="w-80" src="/logo.svg" alt="logo" />
    </NavLink>
  );
}
