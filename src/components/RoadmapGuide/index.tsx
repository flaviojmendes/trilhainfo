import { Link } from 'react-router-dom';
import { curriculumReviewedAt, curriculumReviewLabel, roadmapGuides } from '../../roadmaps/guides';
import { RoadmapFileModel } from '../../entity/RoadmapFileModel';

export default function RoadmapGuide({ name }: { name: keyof RoadmapFileModel }) {
  const guide = roadmapGuides[name];
  if (!guide) return null;

  return (
    <section
      aria-label="Orientação de estudo"
      className="my-6 border-b border-title-primary pb-6 font-title text-text-primary"
    >
      <p className="mb-3 text-sm text-title-primary">
        {guide.kind} · Revisada em{' '}
        <time dateTime={curriculumReviewedAt}>{curriculumReviewLabel}</time>
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Seu ponto de partida</h2>
      <p className="max-w-[70ch] leading-relaxed">{guide.audience}</p>
      <dl className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <dt className="font-semibold">Por onde começar</dt>
          <dd className="mt-1 max-w-[65ch] leading-relaxed">{guide.start}</dd>
        </div>
        <div>
          <dt className="font-semibold">O que construir</dt>
          <dd className="mt-1 max-w-[65ch] leading-relaxed">{guide.outcome}</dd>
        </div>
      </dl>
      {guide.prerequisite && (
        <Link
          className="mt-4 inline-block text-text-primary underline underline-offset-4 hover:text-title-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          to={guide.prerequisite.path}
        >
          {guide.prerequisite.label}
        </Link>
      )}
      <div className="mt-5 max-w-[75ch]">
        <h3 className="font-semibold">Aprenda com IA desde o início</h3>
        <p className="mt-1 leading-relaxed">
          Escolha Cursor, Claude, Codex ou um chat a que já tenha acesso. Comece com explicações e
          pistas, programe em parceria e depois delegue tarefas pequenas. Nos projetos, abra a
          prática de IA para adaptar um prompt e conferir o resultado. Registre suas decisões e
          demonstre o que aprendeu.
        </p>
      </div>
      <p className="mt-4 max-w-[75ch] text-sm leading-relaxed text-title-primary">
        Siga a ordem e escolha um material inicial por assunto. Escreva código, pratique e use a
        documentação como consulta. Marque os projetos após cumprir seus critérios de conclusão. As
        etapas opcionais podem ficar para depois. Os materiais são gratuitos, com o idioma indicado
        em cada link; certificados, ferramentas de IA e serviços de hospedagem podem ter custo.
      </p>
    </section>
  );
}
