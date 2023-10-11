import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to="/">
      <img className="w-48 lg:w-64" src="/logo.svg" alt="logo" />
    </NavLink>
  );
}
