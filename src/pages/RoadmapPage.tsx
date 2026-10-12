import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import LearningWorkspace from '../components/LearningWorkspace';
import { loadCatalog, roadmapTitles } from '../learning/loaders';
import { RoadmapCatalog } from '../learning/types';
import { useCatalogMetadata } from '../learning/useCatalogMetadata';
import E404Page from './E404Page';
import { useAuth0 } from '@auth0/auth0-react';
import { downloadBlob } from '../learning/downloads';

export default function RoadmapPage() {
  const { isAuthenticated } = useAuth0();
  const { name } = useParams<{ name: string }>();
  const [state, setState] = useState<{ name?: string; catalog?: RoadmapCatalog; error?: string }>(
    {},
  );
  const [attempt, setAttempt] = useState(0);
  const valid = !!name && Object.prototype.hasOwnProperty.call(roadmapTitles, name);
  const catalog = state.name === name ? state.catalog : undefined;
  useCatalogMetadata(catalog);

  async function exportNotes() {
    const base = import.meta.env.VITE_API_URL;
    if (!base) throw new Error('API não configurada');
    const [{ default: axios }, { default: Cookies }] = await Promise.all([
      import('axios'),
      import('universal-cookie'),
    ]);
    const response = await axios.get<string>(`${base}/note/export`, {
      headers: { Authorization: new Cookies().get('api_token') },
    });
    if (typeof response.data !== 'string') throw new Error('Resposta inesperada');
    downloadBlob('notes.md', new Blob([response.data], { type: 'text/markdown;charset=utf-8' }));
  }

  useEffect(() => {
    let cancelled = false;
    if (valid && name)
      loadCatalog(name)
        .then((catalog) => {
          if (!cancelled) setState({ name, catalog });
        })
        .catch(() => {
          if (!cancelled)
            setState({ name, error: 'Não foi possível carregar esta trilha. Tente novamente.' });
        });
    return () => {
      cancelled = true;
    };
  }, [name, valid, attempt]);

  return (
    <MainLayout>
      {!valid ? (
        <E404Page />
      ) : catalog ? (
        <LearningWorkspace
          key={catalog.id}
          catalog={catalog}
          onExportNotes={isAuthenticated ? exportNotes : undefined}
        />
      ) : state.name === name && state.error ? (
        <section className="roadmap-loading">
          <p role="alert">{state.error}</p>
          <button
            type="button"
            onClick={() => {
              setState({});
              setAttempt((value) => value + 1);
            }}
          >
            Tentar novamente
          </button>
        </section>
      ) : (
        <section className="roadmap-loading" aria-label="Carregando trilha" aria-busy="true">
          <h1>{name ? roadmapTitles[name] : 'Trilha'}</h1>
          <p role="status">Preparando seu caminho de estudos…</p>
          <div className="roadmap-skeleton" />
          <div className="roadmap-skeleton" />
        </section>
      )}
    </MainLayout>
  );
}
