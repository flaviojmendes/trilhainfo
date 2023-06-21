import { TypeAnimation } from 'react-type-animation';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ReactGA from 'react-ga4';

export default function Hero() {
  function handleCallToAction() {
    ReactGA.event({
      category: 'action',
      action: 'call_to_action',
    });
  }
  return (
    <section className="mx-0 mb-10 flex w-full items-stretch justify-center gap-4 bg-dark-brown py-10 px-10 xl:px-64">
      <article className="w-full flex-col py-2 md:py-10">
        <div className="mb-10 w-fit rounded-md bg-medium-brown px-3 font-title text-sm text-light-brown">
          Mais de <span className="font-title text-red">20.000 pessoas</span> já acessaram
        </div>
        <div className="min-h-[5em]">
          <TypeAnimation
            // Same String at the start will only be typed once, initially
            sequence={[
              'Qual linguagem devo aprender primeiro?',
              4000,
              'É melhor começar pelo Frontend ou Backend?',
              4000,
              'É possível programar sem saber inglês?',
              4000,
              'Só vou aprender com cursos pagos?',
              4000,
              'Como sei se sou Júnior ou Senior?',
              4000,
            ]}
            speed={60} // Custom Speed from 1-99 - Default Speed: 40
            className="text-2xl text-yellow md:text-4xl"
            wrapper="h1" // Animation will be rendered as a <span>
            repeat={Infinity} // Repeat this Animation Sequence infinitely
          />
        </div>
        <p className=" mt-10 max-w-xl font-title text-lg text-red md:text-xl">
          Essas dúvidas não são só suas.
        </p>
        <p className=" mt-1 max-w-xl font-title text-lg text-yellow md:text-xl">
          Desde Junho/2022 mais de 20.000 pessoas já acessaram a{' '}
          <span className="font-title text-red">Trilha Info </span>
          gratuitamente como uma ferramenta de apoio aos estudos.
        </p>
        <div className="my-6 flex w-fit rounded-md bg-medium-brown px-2 font-title text-sm text-light-brown">
          <div className="m-auto mr-2 h-2 w-2 rounded-full bg-blue"></div>Conteúdo totalmente
          gratuito
        </div>
        <div className="relative flex h-fit w-full md:w-fit">
          <AnchorLink
            onClick={handleCallToAction}
            href="#mainRoadmaps"
            className="z-20 w-full rounded-md bg-light-brown p-2 text-center font-title duration-150 hover:bg-light-orange"
          >
            Comece Agora
          </AnchorLink>
          <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-red"></div>
        </div>
      </article>
      <div className="hidden md:flex">
        <img className="m-auto rounded-md lg:w-2/3" src="/hero.png" alt="hero"></img>
      </div>
    </section>
  );
}
