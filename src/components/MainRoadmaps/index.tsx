import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { mainRoadmapsData } from './mainRoadmapsData';

export default function MainRoadmaps() {
  return (
    <section id="mainRoadmaps" className="px-10 pt-4">
      <h2 className=" my-6 font-title text-4xl text-title-primary md:w-1/3 xl:ml-64">
        Tudo o que você precisa saber no universo de:
      </h2>

      <section className="mx-auto grid w-full grid-cols-1 gap-5 space-y-10 pb-10 md:grid-cols-2 md:space-y-0 xl:px-64 2xl:grid-cols-3">
        {mainRoadmapsData.map((mainRoadmap) => {
          return (
            <article className="group relative m-auto flex h-full w-fit" key={mainRoadmap.title}>
              <Link
                className="z-20 flex w-full rounded-sm bg-box-primary py-3 pr-2 duration-100 hover:shadow-primary-blue"
                to={mainRoadmap.url}
              >
                <div className="flex w-full flex-col">
                  <div className="w-fit">
                    <h3 className="ml-4 mb-2 font-title text-3xl font-semibold text-text-primary">
                      {mainRoadmap.title}
                    </h3>
                    <div className="to-transparent ml-4 h-1 w-full bg-gradient-to-r from-primary"></div>
                  </div>
                  <p className="m-4 font-title text-sm text-text-primary">
                    {mainRoadmap.description}
                  </p>
                  <div className="grow"></div>
                  <div className="ml-4 flex text-primary">
                    <span className="my-auto font-title font-semibold">Comece agora</span>
                    <BsArrowRightCircleFill className="my-auto ml-2" />
                  </div>
                </div>
                {/* <div className="flex w-1/3">
                  <img className="m-auto w-full" alt={'Ícone do Roadmap'} src={mainRoadmap.image} />
                </div> */}
              </Link>
              {/* <div className="absolute top-1 left-1 -right-1 -bottom-1 z-10 rounded-sm bg-red group-hover:bg-red"></div> */}
            </article>
          );
        })}
      </section>
      <div className="mt-10 flex gap-2 lg:mt-2">
        <div className="h-3 w-64 bg-gradient-to-r from-black via-text-secondary to-text-secondary"></div>
        <div className="h-3 w-4 bg-gradient-to-r from-black to-primary"></div>
      </div>
    </section>
  );
}
