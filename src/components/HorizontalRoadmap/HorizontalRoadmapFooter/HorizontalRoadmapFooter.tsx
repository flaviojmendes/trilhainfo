import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  levelQty?: number;
  currentLevelIndex: number;
  handlePreviousLevel: () => void;
  handleNextLevel: () => void;
  handleNavigateLevel: (index: number) => void;
};

export default function HorizontalRoadmapFooter(props: Props) {
  return (
    <>
      <div className="flex-grow"></div>

      <div className="text-5xl text-yellow cursor-pointer">
        <FaArrowLeft onClick={props.handlePreviousLevel} />
      </div>
      {/* Show in XL Screens */}
      <div className="hidden xl:flex flex-grow gap-1 text-center align-middle txt-title text-3xl text-yellow select-none p-2">
        {[...Array(props.levelQty)].map((item, index) => {
          return (
            <>
              {props.currentLevelIndex === index + 1 && (
                <div className="m-auto cursor-pointer bg-yellow text-sm txt-title font-semibold text-dark-brown rounded-full w-8 h-8 p-0 flex">
                  <span className="m-auto">{index + 1}</span>
                </div>
              )}
              {props.currentLevelIndex !== index + 1 && (
                <div
                  onClick={() => {
                    props.handleNavigateLevel(index);
                  }}
                  className={`m-auto cursor-pointer bg-yellow text-sm text-dark-brown rounded-full w-3 h-3 p-0 flex hover:w-5 hover:h-5`}
                ></div>
              )}
            </>
          );
        })}
      </div>
      {/* Show in Smaller Screens */}
      <div className=" text-yellow align-middle mx-5 text-xl p-0 h-full flex xl:hidden">
        <span className={"m-auto txt-title"}>{`${props.currentLevelIndex} de ${props.levelQty}`}</span>
      </div>
      <div className="text-5xl text-yellow cursor-pointer">
        <FaArrowRight className="select-none" onClick={props.handleNextLevel} />
      </div>
      <div className="flex-grow"></div>
    </>
  );
}
