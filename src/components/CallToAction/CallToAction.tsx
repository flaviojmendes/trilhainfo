import { TypeAnimation } from "react-type-animation";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ReactGA from "react-ga4";

export default function CallToAction() {
  function handleCallToAction() {
    ReactGA.event({
      category: "action",
      action: "call_to_action",
    });
  }
  return (
    <>
      <section className="flex flex-col items-stretch justify-center bg-dark-brown mb-10 py-10 mx-0 w-full shadow-inner">
        <div className="flex-col md:w-1/2 m-4 md:m-auto py-2 md:py-10">
          <div className="min-h-[4em]">
            <TypeAnimation
              // Same String at the start will only be typed once, initially
              sequence={[
                "Qual linguagem devo aprender primeiro?",
                4000,
                "É melhor começar pelo Frontend ou Backend?",
                4000,
                "É possível programar sem saber inglês?",
                4000,
                "Só vou aprender com cursos pagos?",
                4000,
                "Como sei se sou Júnior ou Senior?",
                4000,
              ]}
              speed={60} // Custom Speed from 1-99 - Default Speed: 40
              className="text-2xl md:text-4xl text-yellow"
              wrapper="h1" // Animation will be rendered as a <span>
              repeat={Infinity} // Repeat this Animation Sequence infinitely
            />
          </div>
          <p className=" mt-10 max-w-xl text-lg md:text-xl txt-title text-yellow">
            Essas dúvidas não são só suas.
          </p>
          <p className=" mt-1 max-w-xl text-lg md:text-xl txt-title text-yellow">
            Desde Junho/2022 mais de 18.000 pessoas já acessaram a Trilha Info
            gratuitamente como uma ferramenta de apoio aos estudos.
          </p>
          <div className="flex w-full">
            <AnchorLink
              onClick={handleCallToAction}
              href="#mainRoadmaps"
              className="m-auto mt-10 bg-blue p-4 text-2xl txt-title rounded-full"
            >
              Começar Agora! (é grátis)
            </AnchorLink>
          </div>
        </div>
      </section>
    </>
  );
}
