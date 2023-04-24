import { Link } from 'react-router-dom';

export default function E404Page() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl text-light-brown">
        Infelizmente não encontramos nenhum Roadmap com esse nome
      </h1>
      <p className="text-light-brown">
        Clique{' '}
        <Link
          to="/#mainRoadmaps"
          className="text-blue transition-colors hover:text-dark-blue hover:underline"
        >
          aqui
        </Link>{' '}
        para ver os nossos principais Roadmaps.
      </p>
    </div>
  );
}
