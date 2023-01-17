import { chakra } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  const Link = chakra(NavLink);

  return (
    <>
      <Link to={"/"}>
        <h1 className="text-center md:text-start site-logo font-bold text-2xl">
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
        <h1 className="text-center md:text-start font-bold text-2xl">
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
      </Link>
    </>
  );
}
