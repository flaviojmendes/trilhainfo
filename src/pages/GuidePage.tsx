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

export default function GuidePage() {
  const { guide } = useParams();
 
  useEffect(() => {
   
  }, []);

  function getImageUrl(name: string) {
    return `/guides/${name}.jpg`
  }

  useDocumentTitle("Trilha Info - " + guide);

  return (
    <>
      <MainLayout>
       <img className="m-auto h-screen" src={getImageUrl(guide || '')}/>
      </MainLayout>
    </>
  );
}
