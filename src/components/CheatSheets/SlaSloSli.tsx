export default function SlaSloSli() {
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

        <h1 className="mb-4 text-center font-title text-5xl font-bold text-text-primary">
          SLA, SLO, SLI?
        </h1>

        <p className="mb-8 text-center font-title text-2xl text-text-primary">
          São indicadores de{' '}
          <span className="rounded bg-primary px-2 py-1 font-semibold text-white">performance</span>{' '}
          para qualquer tipo de serviço
        </p>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* SLA Section */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left side - Title */}
              <div className="flex flex-col items-start justify-center">
                <h2 className="mb-2 font-title text-6xl font-bold text-primary">SLA</h2>
                <p className="mb-1 font-title text-2xl font-bold text-text-primary">
                  Service Level Agreement
                </p>
                <p className="text-center font-title text-xl text-title-primary">ou</p>
                <p className="font-title text-2xl font-bold text-text-primary">
                  Garantia de Nível de Serviço
                </p>
              </div>

              {/* Right side - Description */}
              <div>
                <p className="mb-4 text-lg text-text-primary">
                  É um contrato firmado entre as partes envolvidas em uma negociação que determina
                  quais são as{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    responsabilidades
                  </span>{' '}
                  de cada um em relação aos serviços contratados.
                </p>

                <h3 className="mb-2 font-title text-xl font-bold text-primary">Exemplo:</h3>
                <ol className="list-inside list-decimal space-y-2 text-text-primary">
                  <li>
                    O{' '}
                    <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                      contratado
                    </span>{' '}
                    é responsável por identificar e corrigir uma vulnerabilidade 30 dias após
                    reportada.
                  </li>
                  <li>
                    O{' '}
                    <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                      contratado
                    </span>{' '}
                    é reponsável por arcar com os custos causados por indisponibilidade do serviço.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* SLO Section */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left side - Title */}
              <div className="flex flex-col items-start justify-center">
                <h2 className="mb-2 font-title text-6xl font-bold text-primary">SLO</h2>
                <p className="mb-1 font-title text-2xl font-bold text-text-primary">
                  Service Level Objectives
                </p>
                <p className="text-center font-title text-xl text-title-primary">ou</p>
                <p className="font-title text-2xl font-bold text-text-primary">
                  Objetivos de Nível de Serviço
                </p>
              </div>

              {/* Right side - Description */}
              <div>
                <p className="mb-4 text-lg text-text-primary">
                  Consiste em um{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    acordo dentro do SLA
                  </span>
                  , firmado{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    internamente
                  </span>
                  , a fim de garantir que as promessas feitas anteriormente para o cliente sejam
                  cumpridas.
                </p>

                <h3 className="mb-2 font-title text-xl font-bold text-primary">
                  Exemplo (considerando SLA acima):
                </h3>
                <ol className="list-inside list-decimal space-y-2 text-text-primary">
                  <li>
                    O{' '}
                    <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                      time
                    </span>{' '}
                    é responsável por identificar e corrigir uma vulnerabilidade 20 dias após
                    reportada.
                  </li>
                  <li>
                    O{' '}
                    <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                      time
                    </span>{' '}
                    é reponsável por manter um Plano de Recuperação de Desastres para um eventual
                    incidente.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* SLI Section */}
          <div className="rounded-sm bg-box-primary p-6 duration-100 hover:shadow-primary-blue">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left side - Title */}
              <div className="flex flex-col items-start justify-center">
                <h2 className="mb-2 font-title text-6xl font-bold text-primary">SLI</h2>
                <p className="mb-1 font-title text-2xl font-bold text-text-primary">
                  Service Level Indicators
                </p>
                <p className="text-center font-title text-xl text-title-primary">ou</p>
                <p className="font-title text-2xl font-bold text-text-primary">
                  Indicadores de Nível de Serviço
                </p>
              </div>

              {/* Right side - Description */}
              <div>
                <p className="mb-4 text-lg text-text-primary">
                  Tratam-se das{' '}
                  <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                    métricas
                  </span>{' '}
                  que serão utilizadas para verificar o nível de conformidade do Service Level
                  Objective.
                </p>

                <h3 className="mb-2 font-title text-xl font-bold text-primary">Exemplo:</h3>
                <ol className="list-inside list-decimal space-y-2 text-text-primary">
                  <li>
                    Qual o{' '}
                    <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                      tempo médio
                    </span>{' '}
                    para uma vulnerabilidade ser corrigida no projeto?
                  </li>
                  <li>
                    Qual a{' '}
                    <span className="rounded bg-primary px-2 py-1 font-semibold text-white">
                      média percentual
                    </span>{' '}
                    de disponibilidade do serviço ao longo do tempo?
                  </li>
                </ol>
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
