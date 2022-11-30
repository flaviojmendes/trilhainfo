import { InfoIcon, CheckIcon } from "@chakra-ui/icons";
import { FaRegCircle } from "react-icons/fa";
import { Center, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Level, RoadmapItem } from "../../entity/RoadmapItem";
import ReactGA from "react-ga4";

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  setActiveItem: (item: RoadmapItem) => void;
  onOpen: () => void;
  isAllContentRead: (label: string, contentLength: number) => boolean;
  checkAllContent: (label: string, check: boolean) => void;
};

export default function LevelItem(props: Props) {
  function triggerItemSelection(item: RoadmapItem) {
    props.setActiveItem(item);
    ReactGA.event({
      category: "item_open",
      action: "open_" + item.label,
    });
    props.onOpen();
  }

  return (
    <>
      <Stack spacing={0} as="article">
        <div
          className={
            props.level.label
              ? " border-2 bd-red border-dotted pb-5 bg-yellow lg:w-2/3 self-center p-4"
              : ""
          }
        >
          {props.level.label && (
            <>
              <h3 className="text-center my-2 txt-handwritten text-xl">
                {props.level.label}
              </h3>
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
                    onClick={() => {
                      triggerItemSelection(item);
                    }}
                    key={item.label}
                    className={
                      "flex mx-0 my-0 p-1 md:p-2  w-fit text-center cursor-pointer bd-handwritten bd-red hover:bg-white  hover:shadow-md" +
                      (level.length >= 4 ? " mb-3" : "") +
                      (isAllContentRead ? " bg-light-orange" : " bg-brown")
                    }
                  >
                    <Spacer />
                    {isAllContentRead ? (
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
                    <span
                      className={
                        "m-auto c-dark-brown font-semibold txt-handwritten text-xl "
                      }
                    >
                      {item.label}
                    </span>

                    {/* <InfoIcon m="auto" mx="1" color={"#494443"} /> */}
                  </div>
                  {index < level.length - 1 && level.length < 4 && (
                    <div className="bd-red border-2 border-dashed h-1 my-auto min-w-[10px] max-w-[20px] md:max-w-[50px] flex-grow"></div>
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
