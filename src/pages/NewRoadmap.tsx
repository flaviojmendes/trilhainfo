import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import { ChangeEvent, useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { RoadmapModel } from '../entity/RoadmapModel';
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import NewRoadmapPreview from '../components/NewRoadmap/NewRoadmapPreview';
import NewRoadmapEditor from '../components/NewRoadmap/NewRoadmapEditor';

const cookies = new Cookies();

export default function NewRoadmapPage() {
  const [shouldBlock, setShouldBlock] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapModel>(new RoadmapModel());
  const [loading, setLoading] = useState(true);
  const [invalidSlug, setInvalidSlug] = useState(false);
  const { user } = useAuth0();
  const { roadmapId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (roadmapId) {
      (async () => {
        await getRoadmap();
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, []);

  async function getRoadmap() {
    const response = await axios.get<RoadmapModel>(
      import.meta.env.VITE_PUBLIC_URL + `/roadmap/${roadmapId}` || '',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('api_token'),
        },
      },
    );

    setRoadmap(Object.assign(new RoadmapModel(), response.data));
  }

  async function checkSlug() {
    const response = await axios.get<boolean>(
      import.meta.env.VITE_API_URL + `/roadmap/slug/${roadmap.slug}` || '',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('api_token'),
        },
      },
    );

    setInvalidSlug(response.data);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.title = event.target.value || '';
    setRoadmap(roadmapTemp);
    setShouldBlock(true);
  }

  function handleSlugChange(event: ChangeEvent<HTMLInputElement>) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.slug = event.target.value || '';
    setRoadmap(roadmapTemp);
    setShouldBlock(true);
    checkSlug();
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.description = event.target.value || '';
    setRoadmap(roadmapTemp);
    setShouldBlock(true);
  }

  async function handleSaveRoadmap() {
    roadmap.owner = user?.nickname;
    setShouldBlock(false);
    await axios.post(import.meta.env.VITE_API_URL + `/roadmap` || '', roadmap, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookies.get('api_token'),
      },
    });

    navigate('/');
  }

  return (
    <>
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <div className="m-auto mt-2 w-full flex-col md:w-1/2">
            <div className="flex">
              <span className="text-gray-900 border-gray-300 inline-flex items-center rounded-l-md border border-r-0 bg-[#EDF2F7] px-4">
                trilha.info/roadmap/v/
              </span>
              <input
                type="text"
                id="website-admin"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-2 border-[#EDF2F7] bg-[transparent] p-2.5 text-yellow outline-none transition-colors focus:border-yellow"
                placeholder="Uma URL customizada para seu Roadmap"
                value={roadmap.slug}
                onChange={handleSlugChange}
              />
            </div>
            {invalidSlug && (
              <p className="mt-1 text-center font-title text-red">
                Desculpe, mas essa URL já foi escolhida por outra pessoa.. 😔
              </p>
            )}
          </div>
          <div className="m-auto w-full md:w-1/2">
            <span className="text-yellow">Título:</span>
            <input
              type="text"
              id="website-admin"
              className="block w-full min-w-0 flex-1 rounded-lg border-0 bg-[transparent] p-2.5 text-yellow outline-none ring-1 ring-[#EDF2F7] transition-all focus:ring-2 focus:ring-yellow"
              placeholder="Dê um título para o seu Roadmap"
              value={roadmap.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="m-auto w-full md:w-1/2">
            <span className="text-yellow">Descrição:</span>

            <textarea
              id="website-admin"
              className="block min-h-[80px] w-full min-w-0 flex-1 rounded-lg border-0 bg-[transparent] p-2.5 text-yellow outline-none ring-1 ring-[#EDF2F7] transition-all focus:ring-2 focus:ring-yellow"
              placeholder="Dê um título para o seu Roadmap"
              value={roadmap.description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="flex">
          {/* Levels */}

          <div className="mt-8 flex w-full flex-col justify-center space-y-2 md:w-1/2">
            <NewRoadmapEditor
              roadmap={roadmap}
              setShouldBlock={setShouldBlock}
              setRoadmap={setRoadmap}
              shouldBlock={shouldBlock}
            />
          </div>
          {/* Levels End */}
          {/* Preview */}
          <div className="hidden w-0 p-8 md:block md:w-1/2">
            <NewRoadmapPreview roadmap={roadmap} />
          </div>
          {/* Preview End */}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="m-auto mt-8 w-fit self-end">
            <button
              onClick={handleSaveRoadmap}
              className="my-4 mx-auto rounded-sm bg-yellow px-4 py-1 text-lg font-bold text-[black] transition-colors hover:bg-dark-yellow"
            >
              Salvar
            </button>
          </div>
        </div>
      </MainLayout>
      {loading && (
        <div
          className="fixed inset-x-0 top-0 m-0 h-full w-full bg-dark-brown bg-opacity-70 "
          id="signin-success-message"
        >
          <div className="my-4 mt-60 flex w-full items-center justify-center rounded-sm px-6 py-4 text-lg">
            <Grid
              height="80"
              width="80"
              color="#d56a47"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="opacity-100"
              visible={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
