import { Link } from 'react-router-dom';

export default function RoadmapNotfound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center text-text-primary">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl">Infelizmente não encontramos nenhum Roadmap com esse nome.</p>

      <Link
        to="/#mainRoadmaps"
        className="mt-6 rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-shadow hover:text-black"
      >
        Ver Roadmaps Principais
      </Link>
    </div>
  );
}
