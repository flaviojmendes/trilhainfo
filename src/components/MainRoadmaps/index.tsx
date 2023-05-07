import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { mainRoadmapsData } from './mainRoadmapsData';

export default function MainRoadmaps() {
  return (
    <section id="mainRoadmaps" className="px-10 pt-4 xl:px-64">
      <h2 className="font-semibolds c-yellow my-6 font-title text-4xl md:w-1/3">
        Tudo o que você <span className="font-title text-red">precisa saber</span> no universo de:
      </h2>

      <section className="mx-auto grid w-full grid-cols-1 gap-5 space-y-10 pb-10 md:grid-cols-2 md:space-y-0 2xl:grid-cols-3">
        {mainRoadmapsData.map((mainRoadmap) => {
          return (
            <article className="group relative m-auto flex w-fit" key={mainRoadmap.title}>
              <Link
                className="z-20 flex w-full rounded-md bg-brown py-3 pr-2 hover:bg-light-orange"
                to={mainRoadmap.url}
              >
                <div className="flex w-2/3 flex-col">
                  <h3 className="c-dark-brown ml-4 mb-2 font-title text-3xl font-semibold">
                    {mainRoadmap.title}
                  </h3>
                  <p className="m-4 font-title text-sm">{mainRoadmap.description}</p>
                  <div className="grow"></div>
                  <div className="ml-4 flex text-dark-brown">
                    <span className="my-auto font-title font-semibold">Comece agora</span>
                    <BsArrowRightCircleFill className="my-auto ml-2" />
                  </div>
                </div>
                <div className="flex w-1/3">
                  <img className="m-auto w-full" alt={'Ícone do Roadmap'} src={mainRoadmap.image} />
                </div>
              </Link>
              <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-md bg-red group-hover:bg-red"></div>
            </article>
          );
        })}
      </section>
    </section>
  );
}
