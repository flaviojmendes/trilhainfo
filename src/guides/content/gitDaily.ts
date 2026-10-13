import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'areas',
      title: 'Onde as mudanças vivem',
      blocks: [
        {
          type: 'text',
          text: 'Uma mudança passa por quatro lugares até chegar ao time. Entender esse caminho explica quase todos os comandos do Git.',
        },
        {
          type: 'sequence',
          caption: 'O caminho de uma mudança em um dia normal',
          actors: ['Seus arquivos', 'Staging', 'Repositório local', 'Remoto'],
          messages: [
            { from: 3, to: 0, label: '`git pull`', text: 'Traz e aplica o que o time publicou.' },
            {
              from: 0,
              to: 0,
              label: 'Você edita',
              text: 'Confira com `git status` e `git diff`.',
            },
            { from: 0, to: 1, label: '`git add`', text: 'Escolhe o que entra no próximo commit.' },
            {
              from: 1,
              to: 2,
              label: '`git commit`',
              text: 'Grava um ponto na história, só na sua máquina.',
            },
            {
              from: 2,
              to: 3,
              label: '`git push`',
              text: 'Publica a branch para o time.',
              tone: 'ok',
            },
          ],
        },
      ],
    },
    {
      id: 'fluxo',
      title: 'Do início ao pull request',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Atualize a branch principal',
              text: 'Comece sempre a partir da versão mais recente.',
              code: 'git switch main\ngit pull',
            },
            {
              title: 'Crie uma branch para a tarefa',
              text: 'Um nome curto que diga o que ela faz.',
              code: 'git switch -c feat/busca-por-nivel',
            },
            {
              title: 'Faça commits pequenos',
              text: 'Com `-p`, você revisa e escolhe cada trecho antes de adicionar.',
              code: 'git add -p\ngit commit -m "feat: filtra trilhas por nível"',
            },
            {
              title: 'Publique e abra o pull request',
              text: 'Na descrição, diga **o que** mudou, **por que** e **como testar**.',
              code: 'git push -u origin feat/busca-por-nivel',
            },
            {
              title: 'Depois do merge, limpe',
              text: 'Volte para a principal e apague a branch local.',
              code: 'git switch main\ngit pull\ngit branch -d feat/busca-por-nivel',
            },
          ],
        },
      ],
    },
    {
      id: 'conflitos',
      title: 'Resolvendo um conflito',
      blocks: [
        {
          type: 'text',
          text: 'Um conflito acontece quando duas pessoas mudam **a mesma linha** de formas diferentes. O Git não escolhe por você: marca o trecho e espera sua decisão.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'O que aparece no arquivo',
          code: '<<<<<<< HEAD\nconst limite = 20;\n=======\nconst limite = 50;\n>>>>>>> feat/paginacao',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Entre `<<<<<<<` e `=======` está a sua versão. Entre `=======` e `>>>>>>>`, a outra.',
            'Edite o trecho para o resultado correto, que pode juntar as duas, e apague as três linhas de marcação.',
            'Marque como resolvido com `git add arquivo` e conclua com `git commit`.',
            'Rode os testes. Um merge sem conflito ainda pode quebrar o comportamento.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: 'Se você se perdeu no meio, `git merge --abort` volta tudo para antes do merge.',
        },
      ],
    },
    {
      id: 'desfazer',
      title: 'Como desfazer',
      blocks: [
        {
          type: 'table',
          caption: 'Situações comuns e o comando seguro para cada uma',
          head: ['Situação', 'Comando'],
          rows: [
            ['Descartar mudanças não salvas de um arquivo', '`git restore arquivo`'],
            ['Tirar um arquivo do staging', '`git restore --staged arquivo`'],
            ['Corrigir o último commit, ainda não publicado', '`git commit --amend`'],
            ['Desfazer o último commit local, mantendo as mudanças', '`git reset --soft HEAD~1`'],
            ['Desfazer um commit já publicado', '`git revert <hash>`, que cria um commit inverso'],
            ['Guardar mudanças para trocar de branch', '`git stash` e, depois, `git stash pop`'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Não use `git push --force` em branches compartilhadas: ele apaga o trabalho de outras pessoas. Na sua própria branch, prefira `--force-with-lease`, que recusa se alguém tiver publicado algo novo.',
        },
      ],
    },
    {
      id: 'boas-praticas',
      title: 'Hábitos que o time agradece',
      blocks: [
        {
          type: 'list',
          items: [
            'Um commit, uma ideia. Fica mais fácil revisar, reverter e entender o histórico.',
            'Mensagens no imperativo, que digam o efeito: `corrige paginação na busca`. Muitos times seguem o padrão Conventional Commits (`feat:`, `fix:`, `docs:`).',
            'Pull requests pequenos são revisados mais rápido e com mais cuidado.',
            'Coloque `.env` e credenciais no `.gitignore`. Se um segredo for publicado, **troque a chave**: apagar do histórico não basta.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'Pro Git, livro gratuito em português', url: 'https://git-scm.com/book/pt-br/v2' },
    {
      title: 'GitHub Docs: resolver conflitos pela linha de comando',
      url: 'https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line',
    },
    { title: 'Conventional Commits', url: 'https://www.conventionalcommits.org/pt-br/v1.0.0/' },
  ],
};
