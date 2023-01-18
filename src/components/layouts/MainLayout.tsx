import { Link } from "react-router-dom";
import Header from "../Header/Header";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="mx-auto mt-0 w-full flex-grow">{children}</main>
        <footer className="w-full select-none bg-dark-brown py-4 px-10 text-center text-red xl:px-64">
          <span className="c-brown">Idealizado por </span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/flaviojmendes"
            className="hover:underline"
          >
            flaviojmendes
          </a>
          <span className="c-brown">
            {" "}
            e mantido pela{" "}
            <Link
              to={"/roadmap/community"}
              className="text-red hover:underline"
            >
              comunidade
            </Link>
            .
          </span>
        </footer>
      </div>
    </>
  );
}
