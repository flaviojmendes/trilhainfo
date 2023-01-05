import { CheckIcon } from "@chakra-ui/icons";
import { FaRegCircle } from "react-icons/fa";
import { Level, RoadmapItem } from "../../../entity/RoadmapModel";

type Props = {
  roadmapLevel?: Level;
  index: number;
  levelsQty: number;
  handleSelectItem: (item: RoadmapItem) => void;
  isAllContentRead: (label: string, contentLength: number) => boolean;
  checkAllContent: (label: string, check: boolean) => void;
  selectedItem?: RoadmapItem;
};

export default function HorizontalLevelItem(props: Props) {
  return (
    <>
      <div className="text-yellow txt-title text-xl text-center">
        {props.roadmapLevel?.label}
      </div>
      <div className="text-yellow txt-title mt-2 text-center">
        {props.roadmapLevel?.description}
      </div>
      <div className="flex xl:flex-col flex-wrap gap-2">
        {props.roadmapLevel?.items.map((item, index) => {
          return (
            <>
              <div
                onClick={() => {
                  props.handleSelectItem(item);
                }}
                className={`border-2 flex w-fit xl:w-full bg-light-brown border-red p-2 xl:p-4 pl-1 cursor-pointer hover:bg-white rounded-md ${
                  props.selectedItem?.label === item.label ? "bg-white" : ""
                }`}
              >
                {props.isAllContentRead(
                  item.label,
                  item.children?.length || -1
                ) ? (
                  <span className="checking">
                    <CheckIcon
                      m="auto"
                      mx="1"
                      color={"#228B22"}
                      onClick={(e) => {
                        props.checkAllContent(
                          item.label,
                          !props.isAllContentRead(
                            item.label,
                            item.children?.length || -1
                          )
                        );
                        e.stopPropagation();
                      }}
                    />
                  </span>
                ) : (
                  <FaRegCircle
                    className="m-auto mx-1 hover:text-light-orange hover: hover:fill-light-orange checking"
                    onClick={(e) => {
                      props.checkAllContent(
                        item.label,
                        !props.isAllContentRead(
                          item.label,
                          item.children?.length || -1
                        )
                      );
                      e.stopPropagation();
                    }}
                  />
                )}
                <p className="ml-1 xl:ml-2 txt-title text-xl flex-grow">{item.label}</p>
                <p className="txt-title text-xl">{">>"}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
