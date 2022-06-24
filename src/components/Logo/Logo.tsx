import { chakra } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  const Link = chakra(NavLink);

  return (
    <>
      <Link to={"/"}>
        <h1 className="text-center font-bold text-3xl">
          <span className="c-brown">0</span>
          <span className="c-brown">1</span>
          <span className="c-yellow">0</span>
          <span className="c-yellow">1</span>
          <span className="c-blue">0</span>
          <span className="c-red">Trilha</span>
          <span className="c-brown">0</span>
          <span className="c-brown">1</span>
          <span className="c-blue">0</span>
          <span className="c-blue">0</span>
          <span className="c-yellow">1</span>
        </h1>
        <h1 className="text-center font-bold text-3xl">
          <span className="c-yellow">1</span>
          <span className="c-yellow">1</span>
          <span className="c-blue">0</span>
          <span className="c-blue">1</span>
          <span className="c-blue">1</span>
          <span className="c-brown">0</span>
          <span className="c-brown">0</span>
          <span className="c-red">Info</span>
          <span className="c-yellow">1</span>
          <span className="c-blue">0</span>
          <span className="c-blue">0</span>
          <span className="c-yellow">1</span>
          <span className="c-yellow">1</span>
        </h1>
      </Link>
    </>
  );
}
