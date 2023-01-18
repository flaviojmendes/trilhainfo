import { useEffect } from "react";
import { cheatSheets } from "../../guides/cheatSheets";
import { GoPlus } from "react-icons/go";

export default function ProjectInfo() {
  useEffect(() => {}, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch justify-center bg-dark-brown py-10 w-full shadow-inner px-10 xl:px-64 gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex bg-medium-brown rounded-md px-2 font-title text-light-brown text-sm w-fit my-2">
          <div className="bg-red rounded-full w-2 h-2 m-auto mr-2"></div>
          Newsletter mensal sobre a trilha
        </div>
        <p className="text-4xl font-title text-yellow m-auto">
          Assine a <span className="text-red">newsletter</span> para não
          perder as últimas novidades da{" "}
          <span className="text-red">Trilha Info</span>
        </p>
        <a
          className="bg-red hover:bg-dark-red font-title p-2 w-fit rounded-md "
          href="https://www.getrevue.co/profile/flaviojmendes"
        >
          Assine Agora!
        </a>
        <h3 className="font-title text-4xl mt-8 text-yellow font-semibold">
          Open <span className="text-red">Source</span>
        </h3>
        <div className="text-yellow">
          <p className="my-2 font-title">
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
            conteúdos gratuitos em português para pessoas que querem ingressar
            na área de Tecnologia.
          </p>
          <p className="my-8 font-title">
            A motivação em criar esse aplicativo é por acreditar que a
            educação e o conhecimento devem ser democráticos. Qualquer pessoa
            deveria ter acesso aos assuntos que se interessa para que garanta
            um futuro cada vez mais próspero.
          </p>
          <p className="my-8 font-title">
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
          <p className="my-8 font-title">
            Portanto, se você também acredita nisso compartilhe para que o
            conhecimento chegue cada vez mais longe. E participe da nossa
            comunidade no{" "}
            <span className="font-semibold text-red hover:text-light-brown">
              <a target={"_blank"} href="https://discord.gg/HJ3Spm6R">
                Discord
              </a>
            </span>{" "}
          </p>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=flaviojmendes&repo=trilhainfo&type=star&count=true&size=large&v=2"
            scrolling="0"
            width="170"
            height="30"
            title="Trilha Info"
          ></iframe>
        </div>
        <div className="grow"></div>
      </div>

      <div className="w-full flex flex-col mt-10 lg:mt-0 gap-4">
        <div className="flex bg-medium-brown rounded-md px-2 font-title text-light-brown text-sm w-fit my-2">
          <div className="bg-blue rounded-full w-2 h-2 m-auto mr-2"></div>
          Faça download gratuito
        </div>
        <h3 className="text-4xl font-title text-yellow font-semibold">
          <span className="text-blue">Guias</span> Cheat Sheets
        </h3>
        {cheatSheets.map((cheatSheet) => {
          return (
            <div
              key={cheatSheet.id}
              className="flex w-full min-h-fit space-y-2 bg-brown hover:bg-white p-3 rounded-md"
            >
              <a
                className="text-lg md:text-2xl font-title flex gap-2"
                href={`/guide/${cheatSheet.id}`}
              >
                <GoPlus className="my-auto" />{" "}
                <span className="my-auto">{cheatSheet.title}</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
