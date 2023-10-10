import { Link } from 'react-router-dom';
import Header from '../Header';

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col">
      {/* <div className="flex bg-light-orange p-2">
        <p className="m-auto text-center font-title text-sm">
          A Trilha Info está passando por uma revolução. Para saber mais clique{' '}
          <a
            href="https://blog.flaviojmendes.com"
            className="text-dark-red"
            target="_blank"
            rel="noreferrer"
          >
            aqui
          </a>
          .
        </p>
      </div> */}
      <Header />
      <main className="mx-auto mt-0 w-full flex-grow bg-black">{children}</main>
      <footer className="w-full select-none bg-black py-4 px-10 text-center text-text-primary xl:px-64">
        <span className="">Idealizado por </span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://youtube.com/flaviojmendes"
          className="text-primary hover:underline"
        >
          flaviojmendes
        </a>
        <span className="c-brown">
          {' '}
          e mantido pela{' '}
          <Link to={'/roadmap/community'} className="text-primary hover:underline">
            comunidade
          </Link>
          .
        </span>
      </footer>
    </div>
  );
}
