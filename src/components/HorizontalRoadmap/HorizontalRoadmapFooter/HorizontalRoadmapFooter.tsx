import React, { useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Level } from "../../../entity/RoadmapModel";
import { useSelectedItem } from "../LevelProvider/LevelProvider";

type Props = {
  roadmapData: Level[];
  setRoadmapLevel: (item: Level) => void;
  currentLevelIndex: number;
  setCurrentLevelIndex: (index: number) => void;
};

export default function HorizontalRoadmapFooter(props: Props) {
  const [, setSelectedItem] = useSelectedItem();
  const [direction, setDirection] = useState<"left" | "right">("right");

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const levelQty = props.roadmapData.length;

  const currentLevel = props.currentLevelIndex + 1;
  const prevLevel = currentLevel - 1;
  const nextLevel = currentLevel + 1;

  function handleNextLevel() {
    if (props.currentLevelIndex < props.roadmapData.length - 1) {
      const newIndex = props.currentLevelIndex + 1;
      props.setRoadmapLevel(props.roadmapData[newIndex]);
      props.setCurrentLevelIndex(newIndex);
      setSelectedItem(undefined);
      setDirection("right");
    }
  }

  function handlePreviousLevel() {
    if (props.currentLevelIndex >= 1) {
      const newIndex = props.currentLevelIndex - 1;
      props.setRoadmapLevel(props.roadmapData[newIndex]);
      props.setCurrentLevelIndex(newIndex);
      setSelectedItem(undefined);
      setDirection("left");
    }
  }

  function handleNavigateLevel(index: number) {
    props.setRoadmapLevel(props.roadmapData[index]);
    props.setCurrentLevelIndex(index);
    setSelectedItem(undefined);
    setDirection(index > props.currentLevelIndex ? "right" : "left");
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center gap-3">
        <button
          className="text-5xl text-yellow cursor-pointer select-none"
          onClick={handlePreviousLevel}
        >
          <FaArrowLeft />
        </button>
        {/* Show in XL Screens */}
        <div className="hidden xl:flex flex-grow items-center gap-4 txt-title text-3xl text-yellow select-none">
          {/* <MotionConfig */}
          {/*   transition={{ type: "spring", bounce: 0, duration: 0.3 }} */}
          {/* > */}
          {/*   <button */}
          {/*     onClick={handlePreviousLevel} */}
          {/*     className="cursor-pointer text-sm txt-title font-semibold text-white w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative" */}
          {/*   > */}
          {/*     <AnimatePresence custom={direction}> */}
          {/*       {prevLevel > 0 && ( */}
          {/*         <motion.span */}
          {/*           key={prevLevel} */}
          {/*           initial="initial" */}
          {/*           animate="animate" */}
          {/*           exit="exit" */}
          {/*           className="absolute" */}
          {/*           variants={{ */}
          {/*             initial: (direction: string) => ({ */}
          {/*               x: direction === "right" ? 40 : -40, */}
          {/*             }), */}
          {/*             animate: { */}
          {/*               x: 0, */}
          {/*             }, */}
          {/*             exit: (direction: string) => ({ */}
          {/*               x: direction === "right" ? -40 : 40, */}
          {/*             }), */}
          {/*           }} */}
          {/*           custom={direction} */}
          {/*         > */}
          {/*           {prevLevel} */}
          {/*         </motion.span> */}
          {/*       )} */}
          {/*     </AnimatePresence> */}
          {/*   </button> */}
          {/*   <div className="cursor-pointer text-sm txt-title font-semibold bg-yellow text-dark-brown w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative"> */}
          {/*     <AnimatePresence custom={direction}> */}
          {/*       <motion.span */}
          {/*         key={currentLevel} */}
          {/*         initial="initial" */}
          {/*         animate="animate" */}
          {/*         exit="exit" */}
          {/*         className="absolute" */}
          {/*         variants={{ */}
          {/*           initial: (direction: string) => ({ */}
          {/*             x: direction === "right" ? 40 : -40, */}
          {/*           }), */}
          {/*           animate: { */}
          {/*             x: 0, */}
          {/*           }, */}
          {/*           exit: (direction: string) => ({ */}
          {/*             x: direction === "right" ? -40 : 40, */}
          {/*           }), */}
          {/*         }} */}
          {/*         custom={direction} */}
          {/*       > */}
          {/*         {currentLevel} */}
          {/*       </motion.span> */}
          {/*     </AnimatePresence> */}
          {/*   </div> */}

          {/*   <button */}
          {/*     onClick={handleNextLevel} */}
          {/*     className="cursor-pointer text-sm txt-title font-semibold text-white w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative" */}
          {/*   > */}
          {/*     <AnimatePresence custom={direction}> */}
          {/*       {nextLevel <= levelQty && ( */}
          {/*         <motion.span */}
          {/*           key={nextLevel} */}
          {/*           initial="initial" */}
          {/*           animate="animate" */}
          {/*           exit="exit" */}
          {/*           className="absolute" */}
          {/*           variants={{ */}
          {/*             initial: (direction: string) => ({ */}
          {/*               x: direction === "right" ? 36 : -36, */}
          {/*             }), */}
          {/*             animate: { */}
          {/*               x: 0, */}
          {/*             }, */}
          {/*             exit: (direction: string) => ({ */}
          {/*               x: direction === "right" ? -36 : 36, */}
          {/*             }), */}
          {/*           }} */}
          {/*           custom={direction} */}
          {/*         > */}
          {/*           {nextLevel} */}
          {/*         </motion.span> */}
          {/*       )} */}
          {/*     </AnimatePresence> */}
          {/*   </button> */}
          {/* </MotionConfig> */}

          {[...Array(levelQty)].map((_, index) => (
            <button
              className="cursor-pointer text-sm txt-title font-semibold text-dark-brown flex items-center justify-center"
              onClick={() => handleNavigateLevel(index)}
              key={index}
            >
              {props.currentLevelIndex === index ? (
                <motion.div
                  layoutId={(index + 1).toString()}
                  className="w-8 h-8 rounded-full bg-red flex items-center justify-center"
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    key={index}
                    initial="initial"
                    animate="animate"
                    custom={direction}
                    variants={{
                      initial: (direction: string) => ({
                        x: direction === "right" ? -60 : 60,
                      }),
                      animate: {
                        x: 0,
                      },
                    }}
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  >
                    {index + 1}
                  </motion.span>
                </motion.div>
              ) : (
                <motion.div
                  layoutId={(index + 1).toString()}
                  className="w-3 h-3 rounded-full bg-yellow"
                />
              )}
            </button>
          ))}
        </div>
        {/* Show in Smaller Screens */}
        <div className=" text-yellow align-middle mx-5 text-xl p-0 h-full flex xl:hidden">
          <span className={"m-auto txt-title"}>
            {props.currentLevelIndex + 1} de {levelQty}
          </span>
        </div>
        <button
          className="text-5xl text-yellow cursor-pointer select-none"
          onClick={handleNextLevel}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
{
  /* {props.currentLevelIndex !== index && ( */
}
{
  /*   <div */
}
{
  /*     onClick={() => handleNavigateLevel(index)} */
}
{
  /*     className={`m-auto cursor-pointer bg-yellow text-sm text-dark-brown rounded-full w-3 h-3 p-0 flex hover:w-5 hover:h-5`} */
}
{
  /*   /> */
}
{
  /* )} */
}
