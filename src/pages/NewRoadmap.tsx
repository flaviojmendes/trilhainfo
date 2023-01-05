import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { RoadmapModel } from "../entity/RoadmapModel";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import NewRoadmapPreview from "../components/NewRoadmap/NewRoadmapPreview/NewRoadmapPreview";
import NewRoadmapEditor from "../components/NewRoadmap/NewRoadmapEditor/NewRoadmapEditor";

const cookies = new Cookies();

export default function NewRoadmapPage() {
  const [shouldBlock, setShouldBlock] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapModel>(new RoadmapModel());
  const [loading, setLoading] = useState(true);
  const [invalidSlug, setInvalidSlug] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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

    setInvalidSlug(!response.data);
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
          <div className="w-full md:w-1/2 m-auto mt-2 flex-col">
            <InputGroup>
              <InputLeftAddon
                children="trilha.info/roadmap/v/"
                className="bg-yellow"
              />
              <Input
                className="c-yellow txt-title"
                fontSize={"md"}
                value={roadmap.slug}
                onChange={handleSlugChange}
                placeholder="Uma URL customizada para seu Rodmap"
                size="md"
              />
            </InputGroup>
            {invalidSlug && (
              <p className="text-center mt-1 txt-title text-red">
                Desculpe, mas essa URL já foi escolhida por outra pessoa.. 😔
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 m-auto">
            <span className="c-yellow">Título:</span>
            <Input
              className="c-yellow font-semibold txt-title"
              fontSize={"xl"}
              value={roadmap.title}
              onChange={handleTitleChange}
              placeholder="Dê um título para o seu Roadmap"
              size="md"
            />
          </div>
          <div className="w-full md:w-1/2 m-auto">
            <span className="c-yellow">Descrição:</span>
            <Textarea
              className="c-red"
              value={roadmap.description}
              onChange={handleDescriptionChange}
              placeholder="Escreva uma breve descrição para o seu Roadmap"
              size="sm"
            />
          </div>
        </div>
        <div className="flex">
          {/* Levels */}

          <div className="w-full md:w-1/2 flex flex-col space-y-2 justify-center mt-8">
            <NewRoadmapEditor
              roadmap={roadmap}
              setShouldBlock={setShouldBlock}
              setRoadmap={setRoadmap}
              shouldBlock={shouldBlock}
            />
          </div>
          {/* Levels End */}
          {/* Preview */}
          <div className="w-0 hidden md:block md:w-1/2 p-8">
            <NewRoadmapPreview roadmap={roadmap} />
          </div>
          {/* Preview End */}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="w-fit self-end m-auto mt-8">
            <Button
              my="4"
              mx={"auto"}
              colorScheme="yellow"
              variant="solid"
              onClick={handleSaveRoadmap}
            >
              Salvar
            </Button>
          </div>
        </div>
      </MainLayout>
      {loading && (
        <div
          className="m-0 w-full h-full fixed inset-x-0 top-0 bg-dark-brown bg-opacity-70 "
          id="signin-success-message"
        >
          <div className="px-6 py-4 my-4 rounded-md text-lg flex items-center justify-center w-full mt-60">
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
