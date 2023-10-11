import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink className={'my-auto'} to="/">
      <img className="my-auto w-36" src="/logo.png" alt="logo" />
    </NavLink>
  );
}
