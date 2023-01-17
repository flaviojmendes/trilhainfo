import { chakra } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  const Link = chakra(NavLink);

  return (
    <>
      <Link to={"/"}>
        <h1 className="text-center md:text-start site-logo font-bold text-2xl txt-handwritten">
          <span className="c-brown txt-handwritten">0</span>
          <span className="c-brown txt-handwritten">1</span>
          <span className="c-yellow txt-handwritten">0</span>
          <span className="c-yellow txt-handwritten">1</span>
          <span className="c-blue txt-handwritten">0</span>
          <span className="c-red txt-handwritten">Trilha</span>
          <span className="c-brown txt-handwritten">0</span>
          <span className="c-brown txt-handwritten">1</span>
          <span className="c-blue txt-handwritten">0</span>
          <span className="c-blue txt-handwritten">0</span>
          <span className="c-yellow txt-handwritten">1</span>
        </h1>
        <h1 className="text-center md:text-start font-bold text-2xl txt-handwritten">
          <span className="c-yellow txt-handwritten">1</span>
          <span className="c-yellow txt-handwritten">1</span>
          <span className="c-blue txt-handwritten">0</span>
          <span className="c-blue txt-handwritten">1</span>
          <span className="c-blue txt-handwritten">1</span>
          <span className="c-brown txt-handwritten">0</span>
          <span className="c-brown txt-handwritten">0</span>
          <span className="c-red txt-handwritten">Info</span>
          <span className="c-yellow txt-handwritten">1</span>
          <span className="c-blue txt-handwritten">0</span>
          <span className="c-blue txt-handwritten">0</span>
          <span className="c-yellow txt-handwritten">1</span>
          <span className="c-yellow txt-handwritten">1</span>
        </h1>
      </Link>
    </>
  );
}
