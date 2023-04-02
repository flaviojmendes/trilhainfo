import { useNavigate } from 'react-router-dom';
import { Level, RoadmapItem } from '../../entity/RoadmapModel';
import { TbFileCertificate, TbGitFork } from 'react-icons/tb';
import { DrawerTrigger } from '../Drawer';
import ReactGA from 'react-ga4';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegCircle } from 'react-icons/fa';
import { CheckIcon } from '../CheckIcon';
import { CertificationResult } from '../../entity/CertificationModel';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

type Props = {
  item: RoadmapItem;
  isAllContentRead: (label: string, contentLength: number) => boolean;
  level: Level;
  setActiveItem: (item: RoadmapItem) => void;
  updateLastSelectedElement: (element: HTMLElement | null) => void;
  index: number;
  checkAllContent: (label: string, check: boolean) => void;
};

export default function Item({
  item,
  isAllContentRead,
  level,
  checkAllContent,
  setActiveItem,
  updateLastSelectedElement,
  index,
}: Props) {
  const navigate = useNavigate();

  const [passedCertification, setPassedCertification] = useState(false);
  const [certificationResult, setCertificationResult] = useState<CertificationResult>();

  useEffect(() => {
    (async () => {
      if (item.certification) {
        await checkPassedCertification(item.certification);
      }
    })();
  }, [item.certification]);

  function triggerItemSelection(item: RoadmapItem) {
    setActiveItem(item);
    window.history.pushState(item.label, item.label, `#${encodeURI(item.label)}`);
    ReactGA.event({
      category: 'item_open',
      action: 'open_' + item.label,
    });
  }

  function navigateCertification(
    event:
      | React.MouseEvent<SVGElement | HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<SVGElement>,
    certification: string,
  ) {
    if (passedCertification) {
      navigate(`/certification-result/${certificationResult?.id}`);
    } else {
      navigate(`/certification/${certification}`);
    }
    event.stopPropagation();
  }

  function handleToggleAllSelection(
    event:
      | React.MouseEvent<SVGElement | HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<SVGElement>,
    item: RoadmapItem,
  ) {
    checkAllContent(item.label, !isAllContentRead(item.label, item.children?.length || -1));
    event.stopPropagation();
  }

  async function checkPassedCertification(certification: string) {
    const response = await axios.get<CertificationResult>(
      `${import.meta.env.VITE_API_URL}/certification/${certification}/highest-score`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('api_token'),
        },
      },
    );
    if (response.data.correctQuestions / response.data.questions.length >= 0.75) {
      setCertificationResult(response.data);
      setPassedCertification(true);
    }
  }

  function triggerSubRoadmapSelection(url: string | undefined) {
    if (url) {
      navigate(url);
    }
  }
  return (
    <>
      {item.url && (
        <div className={'relative flex h-fit w-fit' + (level.items.length >= 4 ? ' mb-3' : '')}>
          <button
            onClick={() => {
              triggerSubRoadmapSelection(item.url);
            }}
            id={item.label}
            className={
              'center z-20 mx-0 my-0 flex w-fit cursor-pointer rounded-md border-2 border-dark-brown p-1 text-center shadow-brutalist-light transition-all duration-300 hover:bg-white hover:shadow-brutalist-light-hover md:p-2' +
              (isAllContentRead(item.label, item.children?.length || 0)
                ? ' bg-light-orange'
                : ' bg-brown')
            }
          >
            <TbGitFork className="m-auto mx-1" tabIndex={0} />

            <p
              className={
                'c-dark-brown m-auto  whitespace-normal font-title text-lg md:whitespace-nowrap'
              }
            >
              {item.label}
            </p>
          </button>
        </div>
      )}

      {!item.url && (
        <div className={'relative flex h-fit w-fit' + (level.items.length >= 4 ? ' mb-3' : '')}>
          <DrawerTrigger
            onClick={(e) => {
              triggerItemSelection(item);
              updateLastSelectedElement(e.currentTarget);
            }}
            id={item.label}
            className={
              'center z-20 mx-0 my-0 flex w-fit cursor-pointer rounded-md border-2 border-dark-brown p-1 text-center shadow-brutalist-light transition-all duration-300 hover:bg-white  hover:shadow-brutalist-light-hover md:p-2' +
              (isAllContentRead(item.label, item.children?.length || 0) || passedCertification
                ? ' bg-light-orange'
                : ' bg-brown')
            }
          >
            {item.certification && (
              <div className="group relative my-auto flex">
                <button
                  onClick={(e) => {
                    navigateCertification(e, item.certification || '');
                  }}
                  className="flex h-full"
                >
                  <TbFileCertificate
                    className={`m-auto my-auto mx-1 ${passedCertification ? 'stroke-green ' : ''}`}
                  />
                </button>
                <div
                  className="absolute bottom-6 -left-16 w-40 rounded-md bg-dark-brown text-sm
                 text-light-brown opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {passedCertification ? 'Certificação Concluída' : 'Fazer Certificação'}
                </div>
              </div>
            )}
            {!item.certification && isAllContentRead(item.label, item.children?.length || 0) && (
              <div className="group relative my-auto flex">
                <button
                  onClick={(e) => {
                    handleToggleAllSelection(e, item);
                  }}
                  className="flex h-full"
                >
                  <span className="animate-checking">
                    <CheckIcon className="m-auto my-auto mx-1 stroke-[#228B22]" />
                  </span>
                </button>
                <div
                  className="absolute bottom-6 -left-16 w-40 rounded-md bg-dark-brown text-sm
                 text-light-brown opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Desmarcar Concluído
                </div>
              </div>
            )}
            {!item.certification && !isAllContentRead(item.label, item.children?.length || 0) && (
              <div className="group relative my-auto flex">
                <FaRegCircle
                  className="hover: m-auto mx-1 animate-checking hover:fill-light-orange hover:text-light-orange"
                  onClick={(e) => {
                    handleToggleAllSelection(e, item);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleToggleAllSelection(e, item);
                    }
                  }}
                  tabIndex={0}
                />
                <div
                  className="absolute bottom-6 -left-16 w-40 rounded-md bg-dark-brown text-sm
                     text-light-brown opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Marcar Concluído
                </div>
              </div>
            )}
            <p
              className={
                'c-dark-brown m-auto  whitespace-normal font-title text-lg md:whitespace-nowrap'
              }
            >
              {item.label}
            </p>
          </DrawerTrigger>
        </div>
      )}

      {index < level.items.length - 1 && level.items.length < 4 && (
        <div className="my-auto h-1 min-w-[10px] max-w-[20px] flex-grow border-b-4 border-dashed border-dark-brown md:max-w-[50px]"></div>
      )}
    </>
  );
}
