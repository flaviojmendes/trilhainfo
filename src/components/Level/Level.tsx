import { InfoIcon } from "@chakra-ui/icons";
import { Center, Flex, Spacer, Stack } from "@chakra-ui/react";
import { RoadmapItem } from "../../entity/RoadmapItem";

type Props = {
  level: RoadmapItem[];
  index: number;
  levelsQty: number;
  setActiveItem: (item: RoadmapItem) => void;
  onOpen: () => void;
}

export default function Level(props: Props) {
  function triggerItemSelection(item: RoadmapItem) {
    props.setActiveItem(item);
    props.onOpen();
  }
  return (
    <>
      <Stack spacing={0}>
        <div className="flex place-content-center">
          {props.level.map((item, index, level) => {
            return (
              <>
                <Flex key={item.label}
                  onClick={() => {
                    triggerItemSelection(item);
                  }}
                  className="mx-0 my-0 bg-brown p-2 w-48 text-center cursor-pointer bd-handwritten hover:bg-white"
                >
                  <Spacer />
                  <span className="m-auto c-dark-brown font-semibold txt-handwritten">
                    {item.label}
                  </span>
                  <Spacer />

                  <InfoIcon m="auto" mx="1" color={"#494443"} />
                </Flex>
                {index < level.length - 1 && (
                  <div className="bd-red border-2 border-dashed h-1 my-auto w-[50px]"></div>
                )}
              </>
            );
          })}
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
