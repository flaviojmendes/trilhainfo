import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ReactGA from 'react-ga4';

const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NewRoadmapPage = lazy(() => import('./pages/NewRoadmap'));
const CustomRoadmapPage = lazy(() => import('./pages/CustomRoadmapPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const GuidesPage = lazy(() => import('./pages/GuidesPage'));
const HorizontalRoadmapPage = lazy(() => import('./pages/HorizontalRoadmapPage'));

const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CoursePage = lazy(() => import('./pages/CoursePage'));
const UserPage = lazy(() => import('./pages/UserPage'));

function App() {
  ReactGA.initialize('G-GQDL3TBPEZ');
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.search,
  });
  return (
    <Suspense
      fallback={
        <p role="status" className="roadmap-loading">
          Carregando página…
        </p>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap/:name" element={<RoadmapPage />} />
        <Route path="/course/:name" element={<CoursePage />} />
        <Route path="/profile" element={<UserPage />} />

        <Route path="/hroadmap/:name" element={<HorizontalRoadmapPage />} />
        <Route path="/roadmap/view/:roadmapId" element={<CustomRoadmapPage />} />
        <Route path="/roadmap/v/:roadmapId" element={<CustomRoadmapPage />} />
        <Route path="/new-roadmap" element={<NewRoadmapPage />} />
        <Route path="/edit-roadmap/:roadmapId" element={<NewRoadmapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/guias" element={<GuidesPage />} />
        <Route path="/guide/:guide" element={<GuidePage />} />
        <Route path="/blog/:title" element={<BlogPostPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
