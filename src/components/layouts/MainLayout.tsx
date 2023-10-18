import { Link } from 'react-router-dom';
import Header from '../Header';

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col bg-black">
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
      <main className="mx-auto mt-[80px] w-full flex-grow bg-[inherit]">{children}</main>
      <footer className="flex h-60 w-full select-none flex-col bg-black bg-footer-pattern bg-cover pt-4 text-center text-text-primary">
        <div>
          <img src="/verticalLogo.svg" className="mx-auto w-64" alt="logo"></img>
        </div>
        <div className="w-full bg-box-primary py-4">
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
            <a href={'/roadmap/community'} className="text-primary hover:underline">
              comunidade
            </a>
            .
          </span>
          <span> Design por </span>
          <a
            target="_blank"
            href={'https://badico.cloud'}
            className="text-primary hover:underline"
            rel="noreferrer"
          >
            Badico Cloud
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
