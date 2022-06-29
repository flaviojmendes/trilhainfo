import { InfoIcon, CheckIcon } from "@chakra-ui/icons";
import { Center, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Level, RoadmapItem } from "../../entity/RoadmapItem";

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  setActiveItem: (item: RoadmapItem) => void;
  onOpen: () => void;
  isAllContentRead: (label: string, contentLength: number) => boolean;
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
              ? " border-2 bd-red border-dotted pb-5 bg-yellow lg:w-2/3 self-center p-4"
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
          <div
            className={
              "flex place-content-center " +
              (props.level.items.length >= 4 ? " flex-wrap space-x-2" : "")
            }
          >
            {props.level.items.map((item, index, level) => {
              const quantity = item.children?.length || -1;
              const isAllContentRead = props.isAllContentRead(
                item.label,
                quantity
              );

              return (
                <>
                  <div
                    key={item.label}
                    onClick={() => {
                      triggerItemSelection(item);
                    }}
                    className={
                      "flex mx-0 my-0 p-2 w-fit text-center cursor-pointer bd-handwritten hover:bg-white" +
                      (level.length >= 4 ? " mb-3" : "") +
                      (isAllContentRead ? " bg-light-orange" : " bg-brown")
                    }
                  >
                    <Spacer />
                    {isAllContentRead ? (
                      <span>
                        <CheckIcon m="auto" mx="1" color={"#00D26A"} />
                      </span>
                    ) : (
                      ""
                    )}
                    <span
                      className={
                        "m-auto c-dark-brown font-semibold txt-handwritten"
                      }
                    >
                      {item.label}
                    </span>
                    <Spacer />

                    <InfoIcon m="auto" mx="1" color={"#494443"} />
                  </div>
                  {index < level.length - 1 && level.length < 4 && (
                    <div className="bd-red border-2 border-dashed h-1 my-auto min-w-[10px] max-w-[50px] flex-grow"></div>
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
