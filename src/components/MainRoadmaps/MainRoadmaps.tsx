import { FaArrowRight } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { mainRoadmaps } from "./mainRoadmaps";

export default function MainRoadmaps() {
  return (
    <div id="mainRoadmaps" className="pt-4 xl:px-64 px-10">
      <h2 className="txt-title font-semibolds md:w-1/3 my-6 text-4xl c-yellow">
        Tudo o que você{" "}
        <span className="text-red txt-title">precisa saber</span> no universo
        de:
      </h2>

      <section className="flex flex-wrap items-stretch space-y-10 pb-10 md:space-y-0 gap-5 w-full mx-auto">
        {mainRoadmaps.map((mainRoadmap) => {
          return (
            <Link
              className="bg-brown md:w-1/3 lg:w-1/4 w-full hover:bg-white py-3 pr-2 rounded-md flex"
              to={mainRoadmap.url}
            >
              <div className="w-2/3 flex flex-col">
                <h3 className="ml-4 font-semibold text-3xl txt-title mb-2 c-dark-brown">
                  {mainRoadmap.title}
                </h3>
                <p className="m-4 text-sm txt-title">
                  {mainRoadmap.description}
                </p>
                <div className="grow"></div>
                <div className="flex ml-4 text-red">
                  <span className="txt-title underline my-auto font-semibold">
                    Comece agora 
                  </span>
                  <BsArrowRightCircleFill  className="my-auto ml-2"/>
                </div>
              </div>
              <div className="w-1/3 flex">
                <img className="w-full m-auto" src={mainRoadmap.image} />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
