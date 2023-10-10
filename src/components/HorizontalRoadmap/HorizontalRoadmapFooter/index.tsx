import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Level } from '../../../entity/RoadmapModel';
import { useSelectedItem } from '../LevelProvider';

type Props = {
  roadmapData: Level[];
  setRoadmapLevel: (item: Level) => void;
  currentLevelIndex: number;
  setCurrentLevelIndex: (index: number) => void;
};

export default function HorizontalRoadmapFooter(props: Props) {
  const [, setSelectedItem] = useSelectedItem();
  const [direction, setDirection] = useState<'left' | 'right'>('right');

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
      setDirection('right');
    }
  }

  function handlePreviousLevel() {
    if (props.currentLevelIndex >= 1) {
      const newIndex = props.currentLevelIndex - 1;
      props.setRoadmapLevel(props.roadmapData[newIndex]);
      props.setCurrentLevelIndex(newIndex);
      setSelectedItem(undefined);
      setDirection('left');
    }
  }

  function handleNavigateLevel(index: number) {
    props.setRoadmapLevel(props.roadmapData[index]);
    props.setCurrentLevelIndex(index);
    setSelectedItem(undefined);
    setDirection(index > props.currentLevelIndex ? 'right' : 'left');
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center gap-3">
        <button
          className="cursor-pointer select-none text-5xl text-primary"
          onClick={handlePreviousLevel}
        >
          <FaArrowLeft />
        </button>
        {/* Show in XL Screens */}
        <div className="hidden flex-grow select-none items-center gap-4 font-title text-3xl text-yellow xl:flex">
          {/* <MotionConfig */}
          {/*   transition={{ type: "spring", bounce: 0, duration: 0.3 }} */}
          {/* > */}
          {/*   <button */}
          {/*     onClick={handlePreviousLevel} */}
          {/*     className="cursor-pointer text-sm font-title font-semibold text-white w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative" */}
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
          {/*   <div className="cursor-pointer text-sm font-title font-semibold bg-light-yellow text-dark-brown w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative"> */}
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
          {/*     className="cursor-pointer text-sm font-title font-semibold text-white w-8 h-8 flex justify-center items-center rounded-full overflow-hidden relative" */}
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
              className="flex cursor-pointer items-center justify-center font-title text-sm font-semibold text-dark-brown"
              onClick={() => handleNavigateLevel(index)}
              key={index}
            >
              {props.currentLevelIndex === index ? (
                <motion.div
                  layoutId={(index + 1).toString()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    key={index}
                    initial="initial"
                    animate="animate"
                    custom={direction}
                    variants={{
                      initial: (direction: string) => ({
                        x: direction === 'right' ? -60 : 60,
                      }),
                      animate: {
                        x: 0,
                      },
                    }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  >
                    {index + 1}
                  </motion.span>
                </motion.div>
              ) : (
                <motion.div
                  layoutId={(index + 1).toString()}
                  className="h-3 w-3 rounded-full bg-text-secondary"
                />
              )}
            </button>
          ))}
        </div>
        {/* Show in Smaller Screens */}
        <div className=" mx-5 flex h-full p-0 align-middle text-xl text-primary xl:hidden">
          <span className={'m-auto font-title'}>
            {props.currentLevelIndex + 1} de {levelQty}
          </span>
        </div>
        <button
          className="cursor-pointer select-none text-5xl text-primary"
          onClick={handleNextLevel}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
