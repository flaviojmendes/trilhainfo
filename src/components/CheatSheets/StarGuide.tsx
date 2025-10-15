export default function StarGuide() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 xl:px-16">
      <div className="rounded-sm p-8">
        {/* Header with code background */}
        <div className="mb-6 rounded-sm bg-dark-brown p-4 text-center">
          <div className="font-mono text-sm text-text-secondary">
            01010<span className="text-primary">Trilha</span>01001
          </div>
          <div className="font-mono text-sm text-yellow">
            11011<span className="text-primary">Info</span>10011
          </div>
        </div>

        <h1 className="mb-8 text-center font-title text-4xl font-bold text-text-primary">
          O que é o modelo <span className="text-primary">STAR</span> para entrevistas?
        </h1>

        {/* TL;DR Section */}
        <div className="mb-8 rounded-sm border-l-4 border-primary bg-box-primary p-6">
          <p className="font-title text-xl text-text-primary">
            <span className="mr-4 font-bold italic text-primary">TL;DR</span>É uma estrutura que te
            ajuda a contar a sua história (e as suas conquistas) fazendo você pensar a partir das
            seguintes etapas: <span className="font-semibold text-primary">situação</span>,{' '}
            <span className="font-semibold text-primary">tarefa</span>,{' '}
            <span className="font-semibold text-primary">ações</span> e{' '}
            <span className="font-semibold text-primary">resultados</span>.
          </p>
        </div>

        {/* STAR Sections */}
        <div className="mb-8 space-y-6">
          {/* Situação */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-primary">
                  <span className="font-title text-4xl font-bold text-white">S</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-2 font-title text-3xl font-bold text-primary">ituação</h2>
                <p className="mb-3 text-lg text-text-primary">
                  Comece sua história{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    ilustrando uma situação
                  </span>{' '}
                  que você passou.
                </p>
                <ol className="list-inside list-decimal space-y-1 text-text-primary">
                  <li>Qual foi a situação?</li>
                  <li>Quem estava envolvido?</li>
                  <li>Por que a situação aconteceu?</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Tarefa */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-primary">
                  <span className="font-title text-4xl font-bold text-white">T</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-2 font-title text-3xl font-bold text-primary">arefa</h2>
                <p className="mb-3 text-lg text-text-primary">
                  Use essa oportunidade para explicar o{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    seu papel na história
                  </span>
                  .
                </p>
                <ol className="list-inside list-decimal space-y-1 text-text-primary">
                  <li>Por que você estava envolvido?</li>
                  <li>Qual o contexto por trás da história?</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-primary">
                  <span className="font-title text-4xl font-bold text-white">A</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-2 font-title text-3xl font-bold text-primary">ções</h2>
                <p className="mb-3 text-lg text-text-primary">
                  Detalhe as{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    atitudes
                  </span>{' '}
                  que você teve para resolver a situação.
                </p>
                <ol className="list-inside list-decimal space-y-1 text-text-primary">
                  <li>Quais os passos que você executou?</li>
                  <li>Por que você agiu dessa forma?</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-primary">
                  <span className="font-title text-4xl font-bold text-white">R</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-2 font-title text-3xl font-bold text-primary">esultados</h2>
                <p className="mb-3 text-lg text-text-primary">
                  Detalhe os{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    resultados das suas ações
                  </span>{' '}
                  e destaque os pontos positivos.
                </p>
                <ol className="list-inside list-decimal space-y-1 text-text-primary">
                  <li>Qual foi o resultado?</li>
                  <li>Como você se sentiu com o resultado?</li>
                  <li>O que aprendeu?</li>
                  <li>Como essa situação contribuiu para a pessoa que você é hoje?</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Example Section */}
        <div className="mb-8 rounded-sm bg-box-primary p-6">
          <h2 className="mb-6 text-center font-title text-3xl font-bold text-primary">Exemplo:</h2>

          <div className="space-y-6">
            {/* S Example */}
            <div className="rounded-sm border-l-4 border-primary bg-dark-brown p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-title text-xl font-bold text-white">
                  S
                </span>
                <h3 className="font-title text-xl font-bold text-primary">Situação</h3>
              </div>
              <p className="text-text-primary">
                Eu era parte de uma equipe de TV e precisávamos em 30 minutos estabelecer uma boa
                estrutura jornalística. Afinal, íamos transmitir ao vivo (e com exclusividade) o
                pronunciamento do prefeito sobre um grave problema ocorrido na cidade.
              </p>
            </div>

            {/* T Example */}
            <div className="rounded-sm border-l-4 border-primary bg-dark-brown p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-title text-xl font-bold text-white">
                  T
                </span>
                <h3 className="font-title text-xl font-bold text-primary">Tarefa</h3>
              </div>
              <p className="text-text-primary">
                Eu atuava na emissora como redatora e escrevia as legendas e vinhetas da TV.
                Portanto, adiantei todas as legendas do pronunciamento do prefeito. Além disso,
                preparei pequenos textos para irem rodando na TV ao longo da fala do prefeito. Isso
                ajudaria a população e o público a entender melhor o tema dessa fala governamental.
              </p>
            </div>

            {/* A Example */}
            <div className="rounded-sm border-l-4 border-primary bg-dark-brown p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-title text-xl font-bold text-white">
                  A
                </span>
                <h3 className="font-title text-xl font-bold text-primary">Ações</h3>
              </div>
              <p className="text-text-primary">
                Nesse sentido, escrevi sobre o que o prefeito falava e destaquei o projeto de lei a
                que ele se referia. Bem como, pedi ao diretor de imagem que inserisse no final da
                fala dele um pequeno texto que fiz sobre o que os resultados a que o governante se
                referia. Isso facilitou que nossos telespectadores ficassem mais bem informados e
                cientes de toda a situação de nossa cidade.
              </p>
            </div>

            {/* R Example */}
            <div className="rounded-sm border-l-4 border-primary bg-dark-brown p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-title text-xl font-bold text-white">
                  R
                </span>
                <h3 className="font-title text-xl font-bold text-primary">Resultados</h3>
              </div>
              <p className="text-text-primary">
                Após o pronunciamento do prefeito, recebemos mensagens agradecendo a transmissão e
                diversas pessoas agradeceram pelo texto exibido no final do &quot;ao vivo&quot;.
                Ademais, a gerência da TV me agradeceu pessoalmente pelo cuidado na redação de um
                texto explicativo sobre toda a situação citada pelo prefeito.
              </p>
            </div>
          </div>
        </div>

        {/* Gradient decoration */}
        <div className="mt-10 flex gap-2">
          <div className="from-transparent h-3 w-64 bg-gradient-to-r via-text-secondary to-text-secondary"></div>
          <div className="h-3 w-4 bg-gradient-to-r from-text-secondary to-primary"></div>
        </div>
      </div>
    </div>
  );
}
