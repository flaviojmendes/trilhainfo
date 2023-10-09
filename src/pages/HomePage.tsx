import MainLayout from '../components/layouts/MainLayout';
import UserArea from '../components/UserArea';
import MainRoadmaps from '../components/MainRoadmaps';
import Hero from '../components/Hero';
import ProjectInfo from '../components/ProjectInfo';
import CheatSheets from '../components/CheatSheets';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <MainRoadmaps />
      <ProjectInfo />
      <CheatSheets />
      <Newsletter />
      <UserArea />
      {/* <OpenSource /> */}
    </MainLayout>
  );
}
