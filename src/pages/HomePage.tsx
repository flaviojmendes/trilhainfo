import MainLayout from '../components/layouts/MainLayout';
import UserArea from '../components/UserArea';
import MainRoadmaps from '../components/MainRoadmaps';
import Hero from '../components/Hero';
import ProjectInfo from '../components/ProjectInfo';
import Blog from '../components/Blog';
import Glossary from '../components/Glossary';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <MainRoadmaps />
      <Glossary />
      {/* <UserArea /> */}
      <ProjectInfo />
      {/* <OpenSource /> */}
    </MainLayout>
  );
}
