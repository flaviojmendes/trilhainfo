import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { FaSquareCheck } from 'react-icons/fa6';
import { Level, RoadmapItem } from '../../entity/RoadmapModel';
import ReactGA from 'react-ga4';
import { DrawerTrigger } from '../Drawer';
import { CheckIcon } from '../CheckIcon';
import { useNavigate } from 'react-router-dom';
import { TbGitFork } from 'react-icons/tb';
import { findRoadmapReadItem, isRead, updateReadAttribute } from '../../support/roadmapUtils';

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  selectedItems: RoadmapItem[];
  setSelectedItems: (items: RoadmapItem[]) => void;
  setActiveItem: (item: RoadmapItem) => void;
  checkAllContent: (label: string, check: boolean) => void;
  updateLastSelectedElement: (element: HTMLElement | null) => void;
};

export default function LevelItem(props: Props) {
  const navigate = useNavigate();

  function triggerItemSelection(item: RoadmapItem) {
    props.setActiveItem(item);
    window.history.pushState(item.label, item.label, `#${encodeURI(item.label)}`);
    ReactGA.event({
      category: 'item_open',
      action: 'open_' + item.label,
    });
  }

  function triggerSubRoadmapSelection(url: string | undefined) {
    if (url) {
      navigate(url);
    }
  }

  function handleToggleAllSelection(
    event:
      | React.MouseEvent<SVGElement | HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<SVGElement>,
    item: RoadmapItem,
    check: boolean,
  ) {
    console.log(item.label);
    const itemLabel = findRoadmapReadItem(item.label, props.selectedItems)?.label;
    console.log(itemLabel);
    if (itemLabel) {
      updateReadAttribute(itemLabel, check, props.setSelectedItems, props.selectedItems);
    }

    event.stopPropagation();
  }

  return (
    <article className="relative flex flex-col">
      <div
        className={
          props.level.label
            ? ' w-full self-center rounded-sm border-2 border-primary bg-box-primary p-4 pb-5 text-text-primary'
            : ''
        }
      >
        {props.level.label && (
          <>
            <h3 className="my-2 text-center font-title text-xl">{props.level.label}</h3>
            <p className="mb-3 text-center">{props.level.description}</p>
          </>
        )}
        <>
          <div
            className={
              'flex place-content-center ' +
              (props.level.items.length >= 4 ? ' flex-wrap space-x-2' : '')
            }
          >
            {props.level.items.map((item, index, level) => {
              const isAllContentRead = isRead(
                `${props.level.label}-${item.label}`,
                props.selectedItems,
              );

              return (
                <>
                  {item.url && (
                    <div
                      className={'relative flex h-fit w-fit' + (level.length >= 4 ? ' mb-3' : '')}
                    >
                      <button
                        onClick={() => {
                          triggerSubRoadmapSelection(item.url);
                        }}
                        id={item.label}
                        className={
                          'center z-20 mx-0 my-0 flex w-fit cursor-pointer rounded-sm border-2 border-primary p-1 text-center hover:bg-white hover:text-black  hover:shadow-md md:p-2' +
                          (isAllContentRead
                            ? ' bg-primary text-black '
                            : ' bg-black text-text-primary')
                        }
                      >
                        <TbGitFork className="m-auto mx-1" tabIndex={0} />

                        <p
                          className={
                            'm-auto  whitespace-normal font-title text-lg md:whitespace-nowrap'
                          }
                        >
                          {item.label}
                        </p>

                        {/* <InfoIcon m="auto" mx="1" color={"#494443"} /> */}
                      </button>
                    </div>
                  )}
                  {!item.url && (
                    <div
                      className={'relative flex h-fit w-fit' + (level.length >= 4 ? ' mb-3' : '')}
                    >
                      <DrawerTrigger
                        onClick={(e) => {
                          triggerItemSelection(item);
                          props.updateLastSelectedElement(e.currentTarget);
                        }}
                        id={item.label}
                        className={
                          'center z-20 mx-0 my-0 flex w-fit cursor-pointer rounded-sm border-2 border-primary p-1 text-center hover:bg-white hover:text-black hover:shadow-primary-shadow md:p-2' +
                          (isAllContentRead ? ' bg-primary' : ' bg-black text-text-primary')
                        }
                      >
                        {isAllContentRead ? (
                          <div className="group relative my-auto flex hover:text-black">
                            <button
                              onClick={(e) => {
                                handleToggleAllSelection(e, item, false);
                              }}
                              className="flex h-full hover:text-black"
                            >
                              <span className="animate-checking">
                                <FaSquareCheck className="m-auto mx-1 my-auto  hover:text-black" />
                              </span>
                            </button>
                            <div
                              className="absolute -left-16 bottom-6 w-40 rounded-sm bg-dark-brown text-sm
                 text-light-brown opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              Desmarcar Concluído
                            </div>
                          </div>
                        ) : (
                          <div className="group relative my-auto flex">
                            <FaRegSquare
                              className="hover: m-auto mx-1 animate-checking hover:fill-primary hover:text-primary"
                              onClick={(e) => {
                                handleToggleAllSelection(e, item, true);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleToggleAllSelection(e, item, true);
                                }
                              }}
                              tabIndex={0}
                            />
                            <div
                              className="absolute -left-16 bottom-6 w-40 rounded-sm bg-dark-brown text-sm
                     text-light-brown opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              Marcar Concluído
                            </div>
                          </div>
                        )}
                        <p
                          className={
                            ' m-auto  whitespace-normal font-title text-lg md:whitespace-nowrap'
                          }
                        >
                          {item.label}
                        </p>

                        {/* <InfoIcon m="auto" mx="1" color={"#494443"} /> */}
                      </DrawerTrigger>
                    </div>
                  )}

                  {index < level.length - 1 && level.length < 4 && (
                    <div className="my-auto h-1 min-w-[10px] max-w-[20px] flex-grow border-b-4 border-dashed border-primary md:max-w-[50px]"></div>
                  )}
                </>
              );
            })}
          </div>
        </>
      </div>
      {props.index < props.levelsQty - 1 && (
        <div className="flex items-center justify-center">
          <div className={`my-0 h-[30px] w-1 bg-box-primary`}></div>
        </div>
      )}
    </article>
  );
}
