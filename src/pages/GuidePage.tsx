import { useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Roadmap from "../components/Roadmap/Roadmap";
import E404Page from "./E404Page";
import useDocumentTitle from "../components/useDocumentTitle";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { RoadmapModel } from "../entity/RoadmapItem";
import { Grid } from "react-loader-spinner";

const cookies = new Cookies();

export default function GuidePage() {
  const { guide } = useParams();
 
  useEffect(() => {
   
  }, []);


  useDocumentTitle("Trilha Info - " + guide);

  return (
    <>
      <MainLayout>
       <img className="m-auto w-10/12" src={`/guides/${guide}.jpg`}/>
      </MainLayout>
    </>
  );
}
