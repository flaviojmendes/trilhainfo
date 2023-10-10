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
    <section className="mx-0 mb-10 flex w-full items-stretch justify-center gap-4 py-10 px-10 xl:px-64">
      <article className="w-full flex-col py-2 md:py-10">
        {/* <div className="mb-10 w-fit rounded-md bg-box-primary px-3 font-title text-sm text-text-secondary">
          Mais de 30.000 pessoas já acessaram
        </div> */}
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
            className="text-2xl text-text-primary md:text-4xl"
            wrapper="h1" // Animation will be rendered as a <span>
            repeat={Infinity} // Repeat this Animation Sequence infinitely
          />
        </div>
        <p className=" mt-10 max-w-xl font-title text-lg text-primary md:text-xl">
          Essas dúvidas não são só suas.
        </p>
        <p className=" mt-1 max-w-xl font-title text-lg text-text-primary md:text-xl">
          Desde Junho/2022 mais de 30.000 pessoas já acessaram a{' '}
          <span className="font-title text-primary">Trilha Info </span>
          gratuitamente como uma ferramenta de apoio aos estudos.
        </p>
        <div className="my-6 flex w-fit rounded-md bg-box-primary px-2 font-title text-sm text-white">
          <div className="m-auto mr-2 h-2 w-2 rounded-full bg-text-secondary"></div>Conteúdo
          totalmente gratuito
        </div>
        {/* <div className="relative flex h-fit w-full md:w-fit">
          <AnchorLink
            onClick={handleCallToAction}
            href="#mainRoadmaps"
            className="z-20 w-full rounded-md bg-light-brown p-2 text-center font-title hover:bg-light-orange "
          >
            Comece Agora
          </AnchorLink>
          <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-red"></div>
        </div> */}
      </article>
      <div className="hidden md:flex">
        <img className="m-auto rounded-md" src="/hero.png" alt="hero"></img>
      </div>
    </section>
  );
}
