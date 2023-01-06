import { CheckIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { FaRegCircle } from "react-icons/fa";
import { Level, RoadmapItem } from "../../../entity/RoadmapModel";
import {
  useLevelRoadmapActions,
  useSelectedItem,
} from "../LevelProvider/LevelProvider";

type HorizontalLevelItemsProps = {
  roadmapLevel?: Level;
  index: number;
};

export default function HorizontalLevelItems(props: HorizontalLevelItemsProps) {
  return (
    <motion.div key={props.index} initial={{ x: 100 }} animate={{ x: 0 }}>
      <p className="text-yellow txt-title text-xl text-center">
        {props.roadmapLevel?.label}
      </p>
      <p className="text-yellow txt-title mt-2 text-center">
        {props.roadmapLevel?.description}
      </p>
      <div className="flex xl:flex-col flex-wrap gap-2">
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
      className={`border-2 flex items-center w-fit xl:w-full border-red p-2 xl:p-4 pl-1 cursor-pointer hover:bg-white rounded-md ${
        selectedItem?.label === item.label ? "bg-white" : "bg-light-brown"
      }`}
    >
      {isAllContentRead() ? (
        <span className="checking">
          <CheckIcon
            mx="1"
            color="#228B22"
            onClick={(e) => {
              checkAllContent(false);
              e.stopPropagation();
            }}
          />
        </span>
      ) : (
        <FaRegCircle
          className="mx-1 hover:text-light-orange hover: hover:fill-light-orange checking"
          onClick={(e) => {
            checkAllContent(true);
            e.stopPropagation();
          }}
        />
      )}
      <p className="ml-1 xl:ml-2 txt-title text-xl">{item.label}</p>
      <p className="txt-title text-xl ml-auto">{">>"}</p>
    </button>
  );
}
