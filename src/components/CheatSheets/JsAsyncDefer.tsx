export default function JsAsyncDefer() {
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

        <h1 className="mb-8 text-center font-title text-5xl font-bold text-text-primary">
          Javascript Async, Defer
        </h1>

        <p className="mb-8 text-center font-title text-xl text-text-primary">
          Vamos considerar os{' '}
          <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
            seguintes passos
          </span>{' '}
          como o fluxo de execução do Javascript:
        </p>

        {/* Initial Flow Diagram */}
        <div className="mb-12 rounded-sm bg-box-primary p-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="rounded-sm border-2 border-primary bg-dark-brown p-4 text-center">
                <p className="font-title text-lg font-bold text-primary">Download da Página</p>
                <p className="text-sm text-text-primary">
                  O browser faz o download da página (HTML)
                </p>
              </div>
            </div>
            <span className="text-3xl text-primary">→</span>
            <div className="flex flex-col items-center">
              <div className="rounded-sm border-2 border-primary bg-dark-brown p-4 text-center">
                <p className="font-title text-lg font-bold text-primary">HTML Parsing</p>
                <p className="text-sm text-text-primary">O browser interpreta o arquivo HTML</p>
              </div>
            </div>
            <span className="text-3xl text-primary">→</span>
            <div className="flex flex-col items-center">
              <div className="rounded-sm border-2 border-primary bg-dark-brown p-4 text-center">
                <p className="font-title text-lg font-bold text-primary">Download do Script</p>
                <p className="text-sm text-text-primary">
                  Enquanto interpreta, se encontrar qualquer script externo, começa o download
                </p>
              </div>
            </div>
            <span className="text-3xl text-primary">→</span>
            <div className="flex flex-col items-center">
              <div className="rounded-sm border-2 border-primary bg-dark-brown p-4 text-center">
                <p className="font-title text-lg font-bold text-primary">Execução do Script</p>
                <p className="text-sm text-text-primary">
                  A execução do script começa assim que o download do script é finalizado
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Script Loading Methods */}
        <div className="space-y-12">
          {/* Normal Script */}
          <div className="rounded-sm bg-box-primary p-6">
            <h2 className="mb-6 font-title text-3xl font-bold text-text-primary">
              Usando{' '}
              <span className="rounded bg-primary px-2 py-1 font-mono text-white">
                &lt;script/&gt;
              </span>{' '}
              para carregar o Javascript:
            </h2>

            <div className="mb-4 flex items-center justify-between">
              <span className="font-title text-sm text-title-primary">Linha do Tempo</span>
              <span className="text-primary">→</span>
            </div>

            <div className="space-y-4">
              {/* Timeline bars */}
              <div className="grid grid-cols-[1fr_2fr_1fr] gap-2">
                <div className="rounded-sm bg-red p-3 text-center">
                  <p className="font-title font-bold text-white">A renderização começa</p>
                </div>
                <div className="rounded-sm bg-dark-brown p-3 text-center">
                  <p className="font-title font-bold text-text-primary">Renderização Pausa</p>
                </div>
                <div className="rounded-sm bg-red p-3 text-center">
                  <p className="font-title font-bold text-white">A renderização continua</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="mb-2 text-sm text-text-primary">
                    Renderização começa logo após o download do HTML
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="rounded-sm bg-text-secondary p-3 text-center">
                  <p className="font-title font-bold text-white">Download do Script</p>
                </div>
                <div className="rounded-sm bg-text-secondary p-3 text-center">
                  <p className="font-title font-bold text-white">Execução do Script</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  Ao encontrar um script, a renderização é{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    pausada para baixar e executá-lo
                  </span>
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  A renderização continua após a execução do script
                </p>
              </div>
            </div>
          </div>

          {/* Async Script */}
          <div className="rounded-sm bg-box-primary p-6">
            <h2 className="mb-6 font-title text-3xl font-bold text-text-primary">
              Usando{' '}
              <span className="rounded bg-primary px-2 py-1 font-mono text-white">
                &lt;script async/&gt;
              </span>{' '}
              para carregar o Javascript:
            </h2>

            <div className="mb-4 flex items-center justify-between">
              <span className="font-title text-sm text-title-primary">Linha do Tempo</span>
              <span className="text-primary">→</span>
            </div>

            <div className="space-y-4">
              {/* Timeline bars */}
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
                <div className="rounded-sm bg-red p-3 text-center">
                  <p className="font-title font-bold text-white">A renderização começa</p>
                </div>
                <div className="rounded-sm bg-dark-brown p-3 text-center">
                  <p className="font-title font-bold text-text-primary">Renderização Pausa</p>
                </div>
                <div className="rounded-sm bg-red p-3 text-center">
                  <p className="font-title font-bold text-white">A renderização continua</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="mb-2 text-sm text-text-primary">
                    Renderização começa logo após o download do HTML
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="rounded-sm bg-text-secondary p-3 text-center">
                  <p className="font-title font-bold text-white">Download do Script</p>
                </div>
                <div className="rounded-sm bg-text-secondary p-3 text-center">
                  <p className="font-title font-bold text-white">Execução do Script</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  Ao encontrar um script, ele é baixado{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    paralelamente
                  </span>{' '}
                  à renderização
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  A renderização é{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    pausada apenas para a execução do script
                  </span>
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  A renderização continua após a execução do script
                </p>
              </div>
            </div>
          </div>

          {/* Defer Script */}
          <div className="rounded-sm bg-box-primary p-6">
            <h2 className="mb-6 font-title text-3xl font-bold text-text-primary">
              Usando{' '}
              <span className="rounded bg-primary px-2 py-1 font-mono text-white">
                &lt;script defer/&gt;
              </span>{' '}
              para carregar o Javascript:
            </h2>

            <div className="mb-4 flex items-center justify-between">
              <span className="font-title text-sm text-title-primary">Linha do Tempo</span>
              <span className="text-primary">→</span>
            </div>

            <div className="space-y-4">
              {/* Timeline bars */}
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <div className="rounded-sm bg-red p-3 text-center">
                  <p className="font-title font-bold text-white">A renderização começa</p>
                </div>
                <div className="rounded-sm bg-red p-3 text-center">
                  <p className="font-title font-bold text-white">A renderização Termina</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="mb-2 text-sm text-text-primary">
                    Renderização começa logo após o download do HTML
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1fr] gap-2">
                <div className="flex justify-start">
                  <div className="rounded-sm bg-text-secondary p-3 text-center">
                    <p className="font-title font-bold text-white">Download do Script</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="rounded-sm bg-text-secondary p-3 text-center">
                    <p className="font-title font-bold text-white">Execução do Script</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  Ao encontrar um script, ele é baixado{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    paralelamente
                  </span>{' '}
                  à renderização
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-text-primary">
                  O script é executado{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    após a renderização
                  </span>{' '}
                  ser finalizada
                </p>
              </div>
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
