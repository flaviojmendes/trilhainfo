import { loadCatalog } from '../learning/loaders';
import { courseLessons, courses, lessons, lessonsByGroup } from '.';
import { LessonBlock, LessonContent } from './types';
import { parseFill } from './tools';

const contents = new Map<string, LessonContent>();

const loadErrors = new Map<string, string>();

beforeAll(async () => {
  for (const lesson of lessons) {
    try {
      contents.set(lesson.id, (await lesson.load()).content);
    } catch (error) {
      loadErrors.set(lesson.id, String(error));
    }
  }
});

function problems(block: LessonBlock): string[] {
  const issues: string[] = [];
  switch (block.type) {
    case 'quiz': {
      const correct = block.options.filter((option) => option.correct).length;
      if (correct !== 1) issues.push(`quiz com ${correct} respostas corretas`);
      if (block.options.length < 2) issues.push('quiz com menos de duas opções');
      if (new Set(block.options.map((option) => option.text)).size !== block.options.length)
        issues.push('quiz com opções repetidas');
      if (block.options.some((option) => !option.feedback.trim()))
        issues.push('opção sem feedback');
      break;
    }
    case 'order':
      if (block.items.length < 3) issues.push('ordenação com menos de três itens');
      if (new Set(block.items).size !== block.items.length)
        issues.push('ordenação com itens repetidos');
      break;
    case 'classify':
      if (block.items.some((item) => !(item.bucket >= 0 && item.bucket < block.buckets.length)))
        issues.push('item classificado em grupo inexistente');
      if (new Set(block.items.map((item) => item.text)).size !== block.items.length)
        issues.push('classificação com itens repetidos');
      break;
    case 'fill':
      if (!parseFill(block.template).some((part) => part.kind === 'blank'))
        issues.push('lacuna sem resposta');
      break;
    case 'trace': {
      const lines = block.code.split('\n').length;
      if (!block.steps.length) issues.push('rastreamento sem passos');
      if (block.steps.some((step) => step.line < 1 || step.line > lines))
        issues.push('rastreamento aponta para linha inexistente');
      break;
    }
    case 'flow':
      if (block.steps.some((step) => !block.actors[step.from] || !block.actors[step.to]))
        issues.push('fluxo com participante inexistente');
      break;
    case 'anatomy':
      if (!block.parts.some((part) => part.label)) issues.push('anatomia sem partes exploráveis');
      break;
    case 'screenReader':
      if (block.variants.some((variant) => !variant.speech.length))
        issues.push('leitor de tela sem falas');
      break;
    case 'playground':
      if (block.checks?.length && !block.solution)
        issues.push('playground com objetivos e sem solução');
      if (!['html', 'css', 'js'].some((language) => block[language as 'html'] !== undefined))
        issues.push('playground sem código');
      break;
    case 'terminal':
      if (!block.steps.length) issues.push('terminal sem passos');
      if (block.steps.some((step) => ![step.command].flat().some((command) => command.trim())))
        issues.push('passo de terminal sem comando aceito');
      break;
    case 'sql':
    case 'python':
      if (block.checks?.length && !block.solution)
        issues.push(`${block.type} com objetivos e sem solução`);
      break;
  }
  return issues;
}

describe('Aulas', () => {
  it('têm IDs únicos e aparecem em pelo menos um curso', () => {
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    const listed = new Set(courses.flatMap((course) => courseLessons(course).map((l) => l.id)));
    expect(lessons.filter((lesson) => !listed.has(lesson.id)).map((lesson) => lesson.id)).toEqual(
      [],
    );
  });

  it('ensinam assuntos que existem em alguma trilha', async () => {
    const catalogs = await Promise.all(courses.map((course) => loadCatalog(course.id)));
    const groups = new Set(catalogs.flatMap((catalog) => Object.keys(catalog?.groups || {})));
    expect(Object.keys(lessonsByGroup()).filter((groupId) => !groups.has(groupId))).toEqual([]);
  });

  it.each(lessons.map((lesson) => [lesson.id]))('%s segue o contrato editorial', (id) => {
    expect(loadErrors.get(id)).toBeUndefined();
    const content = contents.get(id) as LessonContent;
    const issues: string[] = [];
    if (!content.hook.trim()) issues.push('sem abertura');
    if (content.sections.length < 3) issues.push('menos de três seções');
    const sectionIds = content.sections.map((section) => section.id);
    if (new Set(sectionIds).size !== sectionIds.length) issues.push('seções repetidas');
    if (sectionIds.includes('fechamento')) issues.push('seção usa o ID reservado fechamento');
    if (sectionIds.some((sectionId) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(sectionId)))
      issues.push('ID de seção fora do padrão');
    content.sections.forEach((section) => {
      if (!section.blocks.length) issues.push(`seção ${section.id} vazia`);
      section.blocks.forEach((block, index) =>
        problems(block).forEach((issue) => issues.push(`${section.id}[${index}]: ${issue}`)),
      );
    });
    const activities = content.sections
      .flatMap((section) => section.blocks)
      .filter((block) =>
        ['quiz', 'order', 'classify', 'fill', 'playground', 'terminal', 'sql', 'python'].includes(
          block.type,
        ),
      );
    if (activities.length < 4) issues.push(`só ${activities.length} atividades`);
    if (content.recap.length < 3) issues.push('resumo curto');
    if (content.cards.length < 4) issues.push('poucos cartões de revisão');
    const cardIds = content.cards.map((card) => card.id);
    if (new Set(cardIds).size !== cardIds.length) issues.push('cartões repetidos');
    if (cardIds.some((cardId) => cardId.includes(':'))) issues.push('ID de cartão com dois-pontos');
    if (content.mission.steps.length < 2) issues.push('missão sem passos');
    (content.sources || []).forEach((source) => {
      if (!/^https:\/\//.test(source.url)) issues.push(`fonte sem https: ${source.url}`);
    });
    expect(issues).toEqual([]);
  });
});
