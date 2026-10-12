import { Fragment } from 'react';
import { TbGitFork } from 'react-icons/tb';
import ReactGA from 'react-ga4';
import { Level, RoadmapItem } from '../../entity/RoadmapModel';
import { RoadmapRead } from '../../entity/RoadmapReadModel';
import { DrawerTrigger } from '../Drawer';
import { isRead, updateReadAttribute } from '../../support/roadmapUtils';

type Props = {
  level: Level;
  index: number;
  levelsQty: number;
  selectedItems: RoadmapRead[];
  setSelectedItems: (items: RoadmapRead[]) => void;
  setActiveItem: (item: RoadmapItem) => void;
  checkAllContent: (label: string, check: boolean) => void;
  updateLastSelectedElement: (element: HTMLElement | null) => void;
};

export default function LevelItem(props: Props) {
  function select(item: RoadmapItem, trigger: HTMLElement) {
    props.setActiveItem(item);
    props.updateLastSelectedElement(trigger);
    window.history.pushState(item.label, item.label, `#${encodeURIComponent(item.label)}`);
    ReactGA.event({ category: 'item_open', action: 'open_' + item.label });
  }

  return (
    <article className="relative flex flex-col">
      <div
        className={
          props.level.label
            ? 'w-full self-center rounded-sm border-2 border-primary bg-box-primary p-4 pb-5 text-text-primary'
            : ''
        }
      >
        {props.level.label && (
          <>
            <h3 className="my-2 text-center font-title text-xl">{props.level.label}</h3>
            <p className="mb-3 text-center">{props.level.description}</p>
          </>
        )}
        <div className="flex flex-wrap place-content-center gap-2">
          {props.level.items.map((item, index) => {
            const progressLabel = `${props.level.label || props.level.items[0].label}-${
              item.label
            }`;
            const checked = isRead(progressLabel, props.selectedItems);
            const style = `center flex min-h-[44px] items-center rounded-sm border-2 border-primary p-2 font-title text-lg hover:bg-white hover:text-black ${
              checked ? 'bg-primary text-black' : 'bg-black text-text-primary'
            }`;
            return (
              <Fragment key={item.id || item.label}>
                <div className="relative flex items-center gap-1">
                  <label className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center text-text-primary">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) =>
                        updateReadAttribute(
                          progressLabel,
                          event.target.checked,
                          props.setSelectedItems,
                          props.selectedItems,
                        )
                      }
                    />
                    <span className="sr-only">Marcar {item.label} como concluído</span>
                  </label>
                  {item.url ? (
                    <a id={item.label} href={item.url} className={style}>
                      <TbGitFork aria-hidden="true" className="mr-2" />
                      {item.label}
                    </a>
                  ) : (
                    <DrawerTrigger
                      id={item.label}
                      className={style}
                      onClick={(event) => select(item, event.currentTarget)}
                    >
                      {item.label}
                    </DrawerTrigger>
                  )}
                </div>
                {index < props.level.items.length - 1 && props.level.items.length < 4 && (
                  <div
                    aria-hidden="true"
                    className="my-auto h-1 min-w-[10px] max-w-[20px] flex-grow border-b-4 border-dashed border-primary md:max-w-[50px]"
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      {props.index < props.levelsQty - 1 && (
        <div aria-hidden="true" className="flex items-center justify-center">
          <div className="h-[30px] w-1 bg-box-primary" />
        </div>
      )}
    </article>
  );
}
