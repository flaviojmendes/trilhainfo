import MainLayout from "../components/layouts/MainLayout";
import UserArea from "../components/UserArea";
import MainRoadmaps from "../components/MainRoadmaps";
import Hero from "../components/Hero";
import ProjectInfo from "../components/ProjectInfo";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <MainRoadmaps />
      <UserArea />
      <ProjectInfo />
      {/* <OpenSource /> */}
    </MainLayout>
  );
}
