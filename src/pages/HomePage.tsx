import { NavLink } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import UserArea from "../components/UserArea/UserArea";
import MainRoadmaps from "../components/MainRoadmaps/MainRoadmaps";
import CallToAction from "../components/CallToAction/CallToAction";
import ProjectInfo from "../components/ProjectInfo/ProjectInfo";

export default function HomePage() {
  return (
    <>
      <MainLayout>
        <CallToAction />
        <MainRoadmaps />
        <UserArea />
        <ProjectInfo />
        {/* <OpenSource /> */}
      </MainLayout>
    </>
  );
}
