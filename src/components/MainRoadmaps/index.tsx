import { SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { mainRoadmapsData } from './mainRoadmapsData';

export default function MainRoadmaps() {
  return (
    <section id="mainRoadmaps" className="px-10 pt-4 xl:px-64">
      <h2 className="my-6 font-base text-5xl text-dark-pink md:w-2/3">Conheça nossas trilhas.</h2>

      <section className="mx-auto grid w-full grid-cols-1 gap-5 space-y-10 pb-10 md:grid-cols-2 md:space-y-0 2xl:grid-cols-4">
        {mainRoadmapsData.map((mainRoadmap) => {
          return (
            <Link
              key={mainRoadmap.title}
              className="flex w-full rounded-sm bg-card-pink p-4 transition-all hover:bg-card-pink-hover  hover:shadow-solid-blue"
              to={mainRoadmap.url}
            >
              <div className="flex flex-col">
                <h3 className="mb-2 font-base text-3xl text-white">{mainRoadmap.title}</h3>
                <div className="h-2 w-1/2 bg-gradient-to-r from-pink to-transparent"></div>
                <p className="my-4 font-base text-sm text-white">{mainRoadmap.description}</p>
                <div className="grow"></div>
                <div className=" flex gap-2 text-dark-brown">
                  <SlArrowRight className="my-auto ml-2 text-pink " />
                  <span className="my-auto font-base text-pink underline">Comece agora</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </section>
  );
}
