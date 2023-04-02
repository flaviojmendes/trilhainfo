import { Level, RoadmapItem } from '../../entity/RoadmapModel';
import Item from '../Item';

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  setActiveItem: (item: RoadmapItem) => void;
  isAllContentRead: (label: string, contentLength: number) => boolean;
  checkAllContent: (label: string, check: boolean) => void;
  updateLastSelectedElement: (element: HTMLElement | null) => void;
};

export default function LevelItem({
  level,
  index,
  levelsQty,
  setActiveItem,
  isAllContentRead,
  checkAllContent,
  updateLastSelectedElement,
}: Props) {
  return (
    <article className="relative flex flex-col">
      <div className="absolute left-[50%] -z-10 h-full translate-x-[-50%] border-l-4 border-yellow"></div>
      <div
        className={level.label ? ' self-center rounded-md  bg-light-yellow p-4 pb-5 lg:w-2/3' : ''}
      >
        {level.label && (
          <>
            <h3 className="my-2 text-center font-title text-xl">{level.label}</h3>
            <p className="mb-3 text-center">{level.description}</p>
          </>
        )}
        <>
          <div
            className={
              'flex place-content-center ' + (level.items.length >= 4 ? ' flex-wrap space-x-2' : '')
            }
          >
            {level.items.map((item, index) => {
              return (
                <Item
                  key={item.label}
                  checkAllContent={checkAllContent}
                  index={index}
                  isAllContentRead={isAllContentRead}
                  item={item}
                  level={level}
                  setActiveItem={setActiveItem}
                  updateLastSelectedElement={updateLastSelectedElement}
                />
              );
            })}
          </div>
        </>
      </div>
      {index < levelsQty - 1 && (
        <div className="flex items-center justify-center">
          <div className="my-0 h-[30px]"></div>
        </div>
      )}
    </article>
  );
}
