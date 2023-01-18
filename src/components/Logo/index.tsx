import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to="/">
      <h1 className="site-logo text-center text-2xl font-bold md:text-start">
        <span className="c-brown font-monospace">0</span>
        <span className="c-brown font-monospace">1</span>
        <span className="c-yellow font-monospace">0</span>
        <span className="c-yellow font-monospace">1</span>
        <span className="c-blue font-monospace">0</span>
        <span className="c-red font-monospace">Trilha</span>
        <span className="c-brown font-monospace">0</span>
        <span className="c-brown font-monospace">1</span>
        <span className="c-blue font-monospace">0</span>
        <span className="c-blue font-monospace">0</span>
        <span className="c-yellow font-monospace">1</span>
      </h1>
      <h1 className="text-center text-2xl font-bold md:text-start">
        <span className="c-yellow font-monospace">1</span>
        <span className="c-yellow font-monospace">1</span>
        <span className="c-blue font-monospace">0</span>
        <span className="c-blue font-monospace">1</span>
        <span className="c-blue font-monospace">1</span>
        <span className="c-brown font-monospace">0</span>
        <span className="c-brown font-monospace">0</span>
        <span className="c-red font-monospace">Info</span>
        <span className="c-yellow font-monospace">1</span>
        <span className="c-blue font-monospace">0</span>
        <span className="c-blue font-monospace">0</span>
        <span className="c-yellow font-monospace">1</span>
        <span className="c-yellow font-monospace">1</span>
      </h1>
    </NavLink>
  );
}
