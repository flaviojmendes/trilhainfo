import {
  compareSpecificity,
  contrastRatio,
  fillMatches,
  parseFill,
  specificity,
  stableShuffle,
} from './tools';
import {
  addDays,
  dueCardKeys,
  groupsToCredit,
  LessonStore,
  nextCardState,
  reviewIntervals,
} from './progress';

describe('especificidade', () => {
  it.each([
    ['p', [0, 0, 1]],
    ['.destaque', [0, 1, 0]],
    ['#topo', [1, 0, 0]],
    ['ul li a', [0, 0, 3]],
    ['.menu .link:hover', [0, 3, 0]],
    ['a[href^="https"]', [0, 1, 1]],
    ['p::first-line', [0, 0, 2]],
    ['li:nth-child(2n + 1)', [0, 1, 1]],
    [':where(#a, .b) p', [0, 0, 1]],
    [':is(#a, .b) p', [1, 0, 1]],
    [':not(.ativo)', [0, 1, 0]],
    ['*', [0, 0, 0]],
    ['nav > ul + p ~ span', [0, 0, 4]],
  ])('%s vale %j', (selector, expected) => {
    expect(specificity(selector)).toEqual(expected);
  });

  it('compara coluna por coluna, da esquerda para a direita', () => {
    expect(
      compareSpecificity(specificity('#a'), specificity('.a.b.c.d.e.f.g.h.i.j.k')),
    ).toBeGreaterThan(0);
    expect(compareSpecificity(specificity('.a'), specificity('div'))).toBeGreaterThan(0);
    expect(compareSpecificity(specificity('.a'), specificity('.b'))).toBe(0);
  });
});

describe('contraste', () => {
  it('segue a fórmula da WCAG', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#fff', '#fff')).toBeCloseTo(1, 5);
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 2);
    expect(contrastRatio('#ffffff', '#767676')).toBeCloseTo(contrastRatio('#767676', '#ffffff'), 8);
  });
});

describe('embaralhamento estável', () => {
  it('é determinístico e nunca devolve a ordem original', () => {
    const items = ['a', 'b', 'c', 'd'];
    expect(stableShuffle(items, 'x')).toEqual(stableShuffle(items, 'x'));
    for (const seed of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
      const shuffled = stableShuffle(items, seed);
      expect([...shuffled].sort()).toEqual(items);
      expect(shuffled).not.toEqual(items);
    }
    expect(stableShuffle(['único'], 'x')).toEqual(['único']);
  });
});

describe('lacunas', () => {
  it('separa texto e respostas alternativas', () => {
    expect(parseFill('const [[nome]] = [["Ana"|\'Ana\']];')).toEqual([
      { kind: 'text', text: 'const ' },
      { kind: 'blank', answers: ['nome'] },
      { kind: 'text', text: ' = ' },
      { kind: 'blank', answers: ['"Ana"', "'Ana'"] },
      { kind: 'text', text: ';' },
    ]);
  });

  it('ignora espaços extras e ponto e vírgula final', () => {
    expect(fillMatches('  display:  flex; ', ['display: flex'])).toBe(true);
    expect(fillMatches('Flex', ['flex'])).toBe(false);
  });
});

describe('revisão espaçada', () => {
  it('avança de caixa ao lembrar e volta ao início ao esquecer', () => {
    const today = '2026-10-14';
    const first = nextCardState(undefined, true, today);
    expect(first).toEqual({ box: 1, due: addDays(today, reviewIntervals[1]) });
    const second = nextCardState(first, true, today);
    expect(second.box).toBe(2);
    expect(second.due).toBe('2026-10-17');
    expect(nextCardState(second, false, today)).toEqual({ box: 1, due: today });
    expect(nextCardState({ box: 5, due: today }, true, today).box).toBe(5);
  });

  it('atravessa meses ao somar dias', () => {
    expect(addDays('2026-10-30', 3)).toBe('2026-11-02');
  });

  it('lista cartões vencidos, primeiro os menos lembrados', () => {
    const keys = dueCardKeys(
      {
        schemaVersion: 1,
        cards: {
          'a:1': { box: 3, due: '2026-10-10' },
          'a:2': { box: 1, due: '2026-10-14' },
          'b:1': { box: 1, due: '2026-10-20' },
        },
      },
      '2026-10-14',
    );
    expect(keys).toEqual(['a:2', 'a:1']);
  });
});

describe('crédito na trilha', () => {
  it('credita um assunto uma vez por trilha, só quando todas as aulas terminaram', () => {
    const store: LessonStore = {
      schemaVersion: 1,
      lessons: {
        html1: { reached: 3, answers: {}, done: '2026-10-14' },
        html2: { reached: 1, answers: {} },
        css1: { reached: 4, answers: {}, done: '2026-10-14' },
      },
      credited: ['fullstack/css'],
    };
    const map = { html: ['html1', 'html2'], css: ['css1'] };
    expect(groupsToCredit(store, map, 'frontend')).toEqual(['css']);
    expect(groupsToCredit(store, map, 'fullstack')).toEqual([]);
  });
});
