export default function BasicAuth() {
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

        <h1 className="mb-6 text-center font-title text-4xl font-bold text-title-primary">
          Autenticação Básica (Basic Authentication)
        </h1>

        {/* TL;DR Section */}
        <div className="mb-8 rounded-sm border-l-4 border-primary bg-box-primary p-6">
          <p className="mb-4 font-title text-xl text-text-primary">
            <span className="mr-4 font-bold italic text-primary">TL;DR</span>É um mecanismo para
            autenticar o acesso de recursos HTTP
          </p>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-sm bg-dark-brown p-4">
              <p className="mb-2 text-sm font-semibold text-text-secondary">HTTP Request</p>
              <p className="mb-1 text-xs text-primary">Header</p>
              <p className="break-all font-mono text-xs text-text-primary">
                Authorization: Basic Zm4hdm1tYmlBcmdudWSYN1bmhs
              </p>
            </div>
            <div className="flex items-center justify-center rounded-sm bg-dark-brown p-4">
              <div className="text-center">
                <p className="text-sm text-text-secondary">decode</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  &quot;flaviojmendes:minhasenha&quot;
                </p>
              </div>
            </div>
          </div>

          <p className="text-center font-title text-text-primary">
            Usuário e senha são enviados com encoding{' '}
            <span className="font-semibold text-primary">Base64</span> através do cabeçalho da
            requisição HTTP
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="space-y-8">
          {/* Step 1: Client tries to access */}
          <div className="rounded-sm bg-box-primary p-6">
            <div className="mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <h3 className="mb-2 font-title text-xl font-bold text-primary">
                  1. Cliente tenta acessar um recurso protegido
                </h3>
                <div className="rounded-sm bg-dark-brown p-3">
                  <p className="font-mono text-sm text-text-secondary">HTTP GET</p>
                  <p className="font-mono text-sm text-primary">https://trilha.info/trilhas</p>
                </div>
              </div>
              <div className="rounded-sm bg-yellow p-3 text-dark-brown">
                <p className="text-xs font-bold">⚠️ IMPORTANTE</p>
                <p className="text-xs">
                  usar HTTPS, pois usuário e senha estarão sempre trafegando na rede.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Server verifies */}
          <div className="rounded-sm bg-box-primary p-6">
            <h3 className="mb-4 font-title text-xl font-bold text-primary">
              2. Servidor verifica a requisição
            </h3>
            <p className="mb-4 text-text-primary">
              Servidor verifica se a requisição possui o cabeçalho{' '}
              <span className="font-mono font-semibold text-primary">Authorization</span> com
              usuário e senha válidos
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Success Path */}
              <div className="rounded-sm border-2 border-green p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-3xl">😊</span>
                  <span className="font-title text-lg font-semibold text-green">
                    Credenciais válidas
                  </span>
                </div>
                <div className="rounded-sm bg-dark-brown p-3">
                  <p className="mb-1 font-mono text-sm text-green">HTTP 200 OK</p>
                  <p className="font-mono text-xs text-text-primary">
                    {'[{ "trilha A": "conteúdo" }, {...}...]'}
                  </p>
                </div>
              </div>

              {/* Error Path */}
              <div className="rounded-sm border-2 border-red p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-3xl">😟</span>
                  <span className="font-title text-lg font-semibold text-red">
                    Credenciais inválidas
                  </span>
                </div>
                <div className="rounded-sm bg-dark-brown p-3">
                  <p className="mb-1 font-mono text-sm text-red">HTTP 401 Unauthorized</p>
                  <p className="font-mono text-xs text-text-primary">www-authenticate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: 401 Response Details */}
          <div className="rounded-sm bg-box-primary p-6">
            <h3 className="mb-4 font-title text-xl font-bold text-primary">
              3. Resposta 401 Unauthorized
            </h3>
            <div className="mb-4 rounded-sm bg-dark-brown p-4 font-mono text-sm">
              <p className="text-red">HTTP/1.1 401 Unauthorized</p>
              <p className="text-text-secondary">
                Date: <span className="text-text-primary">Wed, 10 Oct 2022 04:23:00 GMT</span>
              </p>
              <p className="text-text-secondary">
                WWW-Authenticate:{' '}
                <span className="text-primary">Basic realm=&quot;Trilha Info&quot;</span>
              </p>
            </div>
            <p className="text-text-primary">
              O <span className="font-semibold text-primary">browser</span> reconhece o cabeçalho{' '}
              <span className="font-mono font-semibold text-primary">www-authenticate</span> que vem
              na resposta e abre uma janela para digitar{' '}
              <span className="font-semibold text-primary">usuário e senha</span>.
            </p>
          </div>

          {/* Step 4: User sends credentials */}
          <div className="rounded-sm bg-box-primary p-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">😊</span>
              <div className="flex-1">
                <h3 className="mb-4 font-title text-xl font-bold text-primary">
                  4. Usuário envia as credenciais
                </h3>
                <p className="text-text-primary">
                  O usuário envia as credenciais, que são codificadas em{' '}
                  <span className="font-semibold text-primary">Base64</span> pelo browser e enviadas
                  em um cabeçalho{' '}
                  <span className="font-mono font-semibold text-primary">Authorization</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Authentication Dialog Example */}
          <div className="rounded-sm bg-box-primary p-6">
            <h3 className="mb-4 text-center font-title text-lg font-bold text-title-primary">
              Exemplo de Janela de Autenticação
            </h3>
            <div className="mx-auto max-w-md rounded-sm border-2 border-text-secondary bg-white p-6">
              <div className="border-gray-300 mb-4 border-b pb-2">
                <p className="text-gray-800 text-sm font-semibold">Authentication Required</p>
                <button className="text-gray-500 float-right">✕</button>
              </div>
              <p className="text-gray-700 mb-4 text-xs">
                The server http://192.168.0.20 requires a username and password. The server says:
                Trilha.
              </p>
              <div className="mb-3">
                <label htmlFor="username-demo" className="text-gray-700 mb-1 block text-xs">
                  User Name
                </label>
                <input
                  id="username-demo"
                  type="text"
                  disabled
                  className="border-gray-300 bg-gray-50 w-full rounded border p-2 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password-demo" className="text-gray-700 mb-1 block text-xs">
                  Password
                </label>
                <input
                  id="password-demo"
                  type="password"
                  disabled
                  className="border-gray-300 bg-gray-50 w-full rounded border p-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button className="bg-gray-200 text-gray-700 rounded px-4 py-2 text-sm">
                  Cancel
                </button>
                <button className="rounded bg-blue px-4 py-2 text-sm text-white">Log In</button>
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
