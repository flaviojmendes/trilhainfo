import { InfoIcon } from "@chakra-ui/icons";
import { Center, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Level, RoadmapItem } from "../../entity/RoadmapItem";

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  setActiveItem: (item: RoadmapItem) => void;
  onOpen: () => void;
};

export default function LevelItem(props: Props) {
  function triggerItemSelection(item: RoadmapItem) {
    props.setActiveItem(item);
    props.onOpen();
  }
  return (
    <>
      <Stack spacing={0}>
        <div
          className={
            props.level.label
              ? " border-2 bd-red border-dotted pb-5 bg-yellow"
              : ""
          }
        >
          {props.level.label && (
            <>
              <h2 className="text-center my-2 txt-handwritten text-xl">
                {props.level.label}
              </h2>
              <p className="text-center mb-3">{props.level.description}</p>
            </>
          )}
          <div className={"flex place-content-center " + (props.level.items.length > 4 ? " flex-wrap" : "")}>
            {props.level.items.map((item, index, level) => {
              return (
                <>
                  <div
                    key={item.label}
                    onClick={() => {
                      triggerItemSelection(item);
                    }}
                    className={"flex mx-0 my-0 bg-brown p-2 w-48 text-center cursor-pointer bd-handwritten hover:bg-white" + (level.length > 4 ? " mb-3" : "")}
                  >
                    <Spacer />
                    <span className="m-auto c-dark-brown font-semibold txt-handwritten">
                      {item.label}
                    </span>
                    <Spacer />

                    <InfoIcon m="auto" mx="1" color={"#494443"} />
                  </div>
                  {index < level.length - 1 && level.length <= 4 && (
                    <div className="bd-red border-2 border-dashed h-1 my-auto w-[50px]"></div>
                  )}
                  {index < level.length - 1 && level.length > 4 && (
                    <div className="w-[50px]"></div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        {props.index < props.levelsQty - 1 && (
          <Center mt={0}>
            <div className="bd-red border-2 w-1 my-0 h-[30px]"></div>
          </Center>
        )}
      </Stack>
    </>
  );
}
