import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosError } from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { FiEdit, FiShare2, FiTrash2 } from 'react-icons/fi';
import { Grid } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { RoadmapModel } from '../../entity/RoadmapModel';
import IconButton from '../../components/IconButton';
import { useToast } from '../../hooks/useToast';

const cookies = new Cookies();

export default function UserArea() {
  const { isAuthenticated, user, isLoading, logout } = useAuth0();
  const navigate = useNavigate();
  const [isLoadingRoadmaps, setLoadingRoadmaps] = useState(true);
  const [roadmaps, setRoadmaps] = useState<RoadmapModel[]>();
  const { addToast } = useToast();

  function handleCreateNew() {
    navigate('/new-roadmap');
  }
  const getRoadmaps = useCallback(async () => {
    setLoadingRoadmaps(true);
    if (cookies.get('api_token')) {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/roadmap/${user?.nickname}` || '',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: cookies.get('api_token'),
            },
          },
        );

        setRoadmaps(response.data);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 403) {
            logout();
          }
        }
      }
    } else {
      logout();
    }
    setLoadingRoadmaps(false);
  }, [logout, user?.nickname]);

  useEffect(() => {
    if (user) {
      getRoadmaps();
    }
  }, [isLoading, getRoadmaps, user]);

  async function handleDeleteRoadmap(roadmapId: string) {
    const answer = window.confirm('Tem certeza que quer deletar?');
    if (answer) {
      setLoadingRoadmaps(true);
      setRoadmaps([]);
      await axios.delete(import.meta.env.VITE_API_URL + `/roadmap/${roadmapId}` || '', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('api_token'),
        },
      });
      getRoadmaps();
    }
  }

  function handleCopyToClipboard(roadmapId: string) {
    navigator.clipboard.writeText(`https://trilha.info/roadmap/view/${roadmapId}`);

    addToast({
      title: 'Feito!',
      message: 'O link para o seu Roadmap foi copiado!',
      status: 'info',
      position: 'bottom',
    });
  }

  if (!isAuthenticated) return null;

  return (
    <section className="mx-0 mt-10 flex w-full flex-col items-stretch justify-center bg-[#403C3B] py-10 px-10 shadow-inner xl:px-64">
      <h2 className="c-yellow my-6 text-center font-title text-3xl">Meus Roadmaps</h2>
      <div className="grid grid-cols-1 gap-5 space-y-10 py-8 md:grid-cols-2 md:space-y-0">
        {roadmaps?.map((roadmap) => {
          return (
            <div key={roadmap.id} className="flex flex-col space-y-2">
              <Link
                className="grow rounded-md  bg-brown py-3 hover:bg-white"
                to={`/roadmap/view/${roadmap.id}`}
              >
                <h3 className="c-dark-brown mb-2 text-center font-title text-3xl">
                  {roadmap.title}
                </h3>
                <p className="mx-5 text-justify">{roadmap.description}</p>
              </Link>
              <div className="flex space-x-2">
                <IconButton
                  aria-label="Editar Roadmap"
                  icon={<FiEdit />}
                  onClick={() => navigate(`/edit-roadmap/${roadmap.id}`)}
                />
                <IconButton
                  aria-label="Deletar Roadmap"
                  onClick={() => handleDeleteRoadmap(roadmap.id || '')}
                  icon={<FiTrash2 />}
                />
                <IconButton
                  aria-label="Compartilhar Roadmap"
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onClick={() => handleCopyToClipboard(roadmap.id!)}
                  icon={<FiShare2 />}
                />
              </div>
            </div>
          );
        })}
        <Grid
          height="80"
          width="80"
          color="#d56a47"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="opacity-100 "
          visible={isLoadingRoadmaps}
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <button
          className="min-h-[40px] rounded-md bg-yellow px-4 font-bold text-[black] transition-colors hover:bg-dark-yellow disabled:cursor-not-allowed disabled:hover:bg-yellow"
          onClick={handleCreateNew}
        >
          + Novo Roadmap
        </button>
      </div>
    </section>
  );
}
