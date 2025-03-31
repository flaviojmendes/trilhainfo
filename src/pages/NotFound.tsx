import { Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';

export default function Notfound() {
  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col items-center justify-center text-center text-text-primary">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl">Ops! A página que você procura não foi encontrada.</p>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-shadow hover:text-black"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </MainLayout>
  );
}
