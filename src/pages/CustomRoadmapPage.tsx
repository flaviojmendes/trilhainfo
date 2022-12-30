import { useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Roadmap from "../components/Roadmap/Roadmap";
import E404Page from "./E404Page";
import useDocumentTitle from "../components/useDocumentTitle";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { RoadmapModel } from "../entity/RoadmapModel";
import { Grid } from "react-loader-spinner";

const cookies = new Cookies();

export default function CustomRoadmapPage() {
  const { roadmapId } = useParams();
  const [isLoadingRoadmap, setLoadingRoadmap] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapModel>();

  useEffect(() => {
    getRoadmap();
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
    setLoadingRoadmap(false);
    setRoadmap(Object.assign(new RoadmapModel(), response.data));
  }

  useDocumentTitle(roadmap ? "Trilha Info - " + roadmap?.title : "Trilha Info");

  return (
    <>
      <MainLayout>
        <p className="mb-4 mt-8 text-center font-semibold c-brown md:px-28">
         {roadmap?.description}
        </p>
        {isLoadingRoadmap && (<div className="w-full justify-center flex mt-32">
          <Grid
            height="80"
            width="80"
            color="#d56a47"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="opacity-100 "
            visible={isLoadingRoadmap}
          />
          </div>
        )}
        {roadmap && (
          <Roadmap isPreview={false} data={roadmap.getLevels()} title={roadmap.title || ""} name={roadmap.id!} />
        )}
        {roadmap && <E404Page />}
      </MainLayout>
    </>
  );
}
