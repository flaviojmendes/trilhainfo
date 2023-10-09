import { SlArrowRight } from 'react-icons/sl';
import Button from '../atom/Button';

export default function ProjectInfo() {
  return (
    <section className="grid w-full grid-cols-1 items-stretch py-10 px-10 text-base shadow-inner xl:px-64">
      <h2 className="my-6 font-base text-5xl text-dark-pink ">
        Da comunidade, para a comunidade.{' '}
      </h2>

      <div className="flex gap-6">
        <div className="flex w-1/3 rounded-sm bg-card-pink p-4">
          <div className="flex flex-col">
            <h3 className="mb-2 font-base text-3xl text-white">A Trilha Info</h3>
            <div className="h-2 w-1/2 bg-gradient-to-r from-pink to-transparent"></div>
            <p className="my-4 font-base text-sm text-white">
              É um projeto{' '}
              <a href="https://github.com/flaviojmendes/trilhainfo" className="text-pink underline">
                Open Source
              </a>{' '}
              que nasceu em Junho/2022 com o objetivo de agregar e organizar conteúdos gratuitos em
              português para pessoas que querem ingressar na área de Tecnologia.
            </p>
            <div className="grow"></div>
            <div className=" flex gap-2 text-dark-brown">
              <SlArrowRight className="my-auto ml-2 text-pink " />
              <span className="my-auto font-base font-semibold text-pink underline">
                Comece agora
              </span>
            </div>
          </div>
        </div>

        <div className="group relative flex w-2/3 rounded-sm bg-[url('/opensourcebanner.png')] bg-cover bg-no-repeat p-0 transition-all">
          <div className="absolute h-full w-full bg-blue mix-blend-color"></div>

          <div className="absolute h-full  w-full bg-gradient-to-r from-black via-transparent to-transparent hover:backdrop-blur-sm"></div>

          <div className="absolute hidden h-full w-full items-center transition-all duration-[10] group-hover:flex  ">
            <div className="flex h-full w-full grow bg-black bg-opacity-80 px-10 backdrop-blur-sm">
              <Button type="secondary" className="m-auto h-16 w-full">
                colabore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
