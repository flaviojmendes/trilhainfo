import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { ChangeEvent, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { RoadmapModel } from "../entity/RoadmapModel";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import NewRoadmapPreview from "../components/NewRoadmap/NewRoadmapPreview";
import NewRoadmapEditor from "../components/NewRoadmap/NewRoadmapEditor";

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
    let response = await axios.get<RoadmapModel>(
      import.meta.env.VITE_PUBLIC_URL + `/roadmap/${roadmapId}` || "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("api_token"),
        },
      }
    );

    setRoadmap(Object.assign(new RoadmapModel(), response.data));
  }

  async function checkSlug() {
    let response = await axios.get<boolean>(
      import.meta.env.VITE_API_URL + `/roadmap/slug/${roadmap.slug}` || "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("api_token"),
        },
      }
    );

    setInvalidSlug(response.data);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.title = event.target.value || "";
    setRoadmap(roadmapTemp);
    setShouldBlock(true);
  }

  function handleSlugChange(event: ChangeEvent<HTMLInputElement>) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.slug = event.target.value || "";
    setRoadmap(roadmapTemp);
    setShouldBlock(true);
    checkSlug();
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    let roadmapTemp: RoadmapModel = Object.assign(new RoadmapModel(), roadmap);
    roadmapTemp.description = event.target.value || "";
    setRoadmap(roadmapTemp);
    setShouldBlock(true);
  }

  async function handleSaveRoadmap() {
    roadmap.owner = user?.nickname;
    setShouldBlock(false);
    await axios.post(import.meta.env.VITE_API_URL + `/roadmap` || "", roadmap, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("api_token"),
      },
    });

    navigate("/");
  }

  return (
    <>
      <MainLayout>
        <div className="flex flex-col space-y-4">
          <div className="m-auto mt-2 w-full flex-col md:w-1/2">
          <div className="flex">
          <span className="inline-flex items-center px-4 text-gray-900 bg-[#EDF2F7] border border-r-0 border-gray-300 rounded-l-md">
            trilha.info/roadmap/v/
          </span>
          <input 
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-[transparent] text-yellow outline-none border-2 border-[#EDF2F7] focus:border-yellow block flex-1 min-w-0 w-full p-2.5 transition-colors" 
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
              className="rounded-lg border-0 bg-[transparent] text-yellow outline-none ring-1 ring-[#EDF2F7] focus:ring-yellow focus:ring-2 block flex-1 min-w-0 w-full p-2.5 transition-all" 
              placeholder="Dê um título para o seu Roadmap"
              value={roadmap.title}
              onChange={handleTitleChange}  
            />
          </div>
          <div className="m-auto w-full md:w-1/2">
            <span className="text-yellow">Descrição:</span>

            <textarea 
              id="website-admin"
              className="rounded-lg border-0 bg-[transparent] text-yellow outline-none ring-1 ring-[#EDF2F7] focus:ring-yellow focus:ring-2 block flex-1 min-w-0 w-full p-2.5 min-h-[80px] transition-all" 
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
              className="my-4 mx-auto px-4 py-1 text-lg font-bold text-[black] bg-yellow hover:bg-dark-yellow rounded-md transition-colors"
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
          <div className="my-4 mt-60 flex w-full items-center justify-center rounded-md px-6 py-4 text-lg">
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
