import { motion } from 'framer-motion';
import { FaCheckSquare, FaRegCircle, FaRegSquare } from 'react-icons/fa';
import { Level, RoadmapItem } from '../../../entity/RoadmapModel';
import { CheckIcon } from '../../CheckIcon';
import { useLevelRoadmapActions, useSelectedItem } from '../LevelProvider';

type HorizontalLevelItemsProps = {
  roadmapLevel?: Level;
  index: number;
};

export default function HorizontalLevelItems(props: HorizontalLevelItemsProps) {
  return (
    <motion.div key={props.index} initial={{ x: 100 }} animate={{ x: 0 }}>
      <p className="text-center font-title text-xl text-white">{props.roadmapLevel?.label}</p>
      <p className="mt-2 text-center font-title text-white">{props.roadmapLevel?.description}</p>
      <div className="flex flex-wrap gap-2 xl:flex-col">
        {props.roadmapLevel?.items.map((item, index) => (
          <HorizontalLevelItem key={index} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

type HorizontalLevelItemProps = {
  item: RoadmapItem;
};

function HorizontalLevelItem({ item }: HorizontalLevelItemProps) {
  const { isAllContentRead, checkAllContent } = useLevelRoadmapActions(item);
  const [selectedItem, setSelectedItem] = useSelectedItem();

  return (
    <button
      onClick={() => setSelectedItem(item)}
      className={`flex w-fit cursor-pointer items-center rounded-md border-2 border-primary  p-2 pl-1 text-white hover:bg-white hover:text-black xl:w-full xl:p-4 ${
        selectedItem?.label === item.label ? 'bg-primary' : 'bg-black'
      }`}
    >
      {isAllContentRead() ? (
        <button
          onClick={(e) => {
            checkAllContent(false);
            e.stopPropagation();
          }}
          className="h-full"
        >
          <span className="animate-checking">
            <FaCheckSquare className="mx-1" />
          </span>
        </button>
      ) : (
        <FaRegSquare
          className="hover: mx-1 animate-checking hover:fill-light-orange hover:text-light-orange"
          onClick={(e) => {
            checkAllContent(true);
            e.stopPropagation();
          }}
        />
      )}
      <p className="ml-1 font-title text-xl xl:ml-2">{item.label}</p>
      <p className="ml-auto font-title text-xl">{'>>'}</p>
    </button>
  );
}
