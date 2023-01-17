import { FaArrowRight } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { mainRoadmapsData } from "./mainRoadmapsData";

export default function MainRoadmaps() {
  return (
    <section id="mainRoadmaps" className="pt-4 xl:px-64 px-10">
      <h2 className="font-title font-semibolds md:w-1/3 my-6 text-4xl c-yellow">
        Tudo o que você{" "}
        <span className="text-red font-title">precisa saber</span> no universo
        de:
      </h2>

      <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 space-y-10 pb-10 md:space-y-0 gap-5 w-full mx-auto">
        {mainRoadmapsData.map((mainRoadmap) => {
          return (
            <Link
              className="bg-brown w-full hover:bg-white py-3 pr-2 rounded-md flex"
              to={mainRoadmap.url}
            >
              <div className="w-2/3 flex flex-col">
                <h3 className="ml-4 font-semibold text-3xl font-title mb-2 c-dark-brown">
                  {mainRoadmap.title}
                </h3>
                <p className="m-4 text-sm font-title">
                  {mainRoadmap.description}
                </p>
                <div className="grow"></div>
                <div className="flex ml-4 text-red">
                  <span className="font-title underline my-auto font-semibold">
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
    </section>
  );
}
