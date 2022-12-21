export default function OpenSource() {
  return (
    <section className="flex flex-col items-stretch justify-center">
      <h2 className="text-center my-6 txt-title text-3xl c-yellow">
        Open Source
      </h2>
      <article className="container text-yellow mx-auto px-4 text-justify txt-title">
        <p className="my-2 txt-title">
          A Trilha Info é um projeto{" "}
          <span className="font-semibold text-red hover:text-light-brown">
            <a
              target={"_blank"}
              href="https://github.com/flaviojmendes/trilhainfo"
            >
              Open Source
            </a>
          </span>{" "}
          que nasceu em Junho/2022 com o objetivo de agregar e organizar
          conteúdos gratuitos em português para pessoas que querem ingressar na
          área de Tecnologia.
        </p>
        <p className="my-8 txt-title">
          A motivação em criar esse aplicativo é por acreditar que a educação e
          o conhecimento devem ser democráticos. Qualquer pessoa deveria ter
          acesso aos assuntos que se interessa para que garanta um futuro cada
          vez mais próspero.
        </p>
        <p className="my-8 txt-title">
          Encontrou um Bug 🐛, tem uma ideia 💡? É só abrir uma{" "}
          <a
            className="font-semibold text-red hover:text-light-brown"
            target={"_blank"}
            href="https://github.com/flaviojmendes/trilhainfo/issues"
          >
            issue
          </a>
          .
        </p>
        <p className="my-8 txt-title">
          Portanto, se você também acredita nisso compartilhe para que o
          conhecimento chegue cada vez mais longe. E participe da nossa
          comunidade no{" "}
          <span className="font-semibold text-red hover:text-light-brown">
            <a target={"_blank"} href="https://discord.gg/HJ3Spm6R">
              Discord
            </a>
          </span>{" "}
        </p>
      </article>
      <div className="w-full mt-4 flex justify-center">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=flaviojmendes&repo=trilhainfo&type=star&count=true&size=large&v=2"
          scrolling="0"
          width="170"
          height="30"
          title="Trilha Info"
        ></iframe>
      </div>
    </section>
  );
}
