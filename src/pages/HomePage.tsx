import MainLayout from '../components/layouts/MainLayout';
import MainRoadmaps from '../components/MainRoadmaps';
import Hero from '../components/Hero';
import ProjectInfo from '../components/ProjectInfo';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="home">
        <Hero />
        <MainRoadmaps />
        <ProjectInfo />
      </div>
    </MainLayout>
  );
}
