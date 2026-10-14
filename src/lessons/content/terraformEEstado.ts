import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Pergunte a alguém como foi criado o servidor da empresa e muitas vezes a resposta é “o Carlos clicou no console, mas ele saiu faz um ano”. Ninguém sabe recriar, ninguém sabe o que muda se mexer. Infraestrutura como código resolve isso: o ambiente vira um arquivo que se lê, se revisa num pull request e se recria com um comando. Terraform é a ferramenta mais pedida para isso em vagas de DevOps.',
  sections: [
    {
      id: 'infra-como-codigo',
      title: 'A receita no lugar da memória',
      blocks: [
        {
          type: 'analogy',
          title: 'A receita do bolo da avó',
          text: 'Enquanto o bolo está só na cabeça da avó, cada vez sai um pouco diferente, e quando ela não está, ninguém faz. Escrita num caderno, qualquer pessoa da família repete, ajusta uma medida e anota a mudança. **Infraestrutura como código** (IaC) é escrever a receita dos seus servidores, redes e bancos.',
        },
        {
          type: 'text',
          text: '**Terraform** é uma ferramenta de IaC. Você escreve arquivos `.tf` descrevendo o que deve existir, e ele cria, altera ou apaga recursos para que a realidade fique igual ao arquivo. Funciona com nuvens (AWS, Google, Azure) e também com coisas locais, como containers Docker.',
        },
        {
          type: 'text',
          text: 'O estilo é **declarativo**: você diz o resultado (“quero um container `site-lab` na porta 8080”), não os passos. Se o container já existe igual, o Terraform não faz nada. Rodar duas vezes dá o mesmo resultado, uma propriedade chamada **idempotência**.',
        },
        {
          type: 'quiz',
          question:
            'Qual é a maior vantagem de criar um servidor com Terraform em vez de clicar no console do provedor?',
          options: [
            {
              text: 'A configuração fica versionada no Git, pode ser revisada e recriada igual',
              correct: true,
              feedback:
                'Isso. Um arquivo responde “o que existe e por quê”, passa por pull request como qualquer código e recria o ambiente inteiro se algo for perdido.',
            },
            {
              text: 'O servidor criado pelo Terraform é mais rápido',
              feedback:
                'O servidor é o mesmo, seja criado por clique ou por código. O ganho está em repetir, revisar e documentar, não em desempenho.',
            },
            {
              text: 'O Terraform não precisa de permissões na nuvem',
              feedback:
                'Precisa, sim. Ele usa uma identidade com permissões, como qualquer pessoa no console. Por isso as permissões dele devem ser mínimas.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-hcl',
      title: 'Lendo um arquivo Terraform',
      blocks: [
        {
          type: 'text',
          text: 'Os arquivos usam a linguagem **HCL**. Ela é feita de **blocos**: uma palavra que diz o tipo, alguns nomes entre aspas e um conteúdo entre chaves. Este exemplo sobe um site Nginx num container Docker no seu próprio computador, sem custo de nuvem.',
        },
        {
          type: 'anatomy',
          caption: 'O arquivo `main.tf` do laboratório local.',
          language: 'hcl',
          parts: [
            {
              text: 'terraform {\n  required_providers {\n    docker = {\n      source  = "kreuzwerker/docker"\n      version = "~> 3.0"\n    }\n  }\n}',
              label: 'Bloco terraform',
              note: 'Diz quais **providers** o projeto usa e em que versão. Um provider é o “tradutor” entre o Terraform e um sistema: AWS, Docker, GitHub. `~> 3.0` aceita 3.x, mas não 4.0.',
            },
            { text: '\n\n' },
            {
              text: 'provider "docker" {}',
              label: 'provider',
              note: 'Configura o provider. Para a AWS, aqui iria a região. Para o Docker local, o padrão já basta.',
            },
            { text: '\n\n' },
            {
              text: 'variable "porta" {\n  type    = number\n  default = 8080\n}',
              label: 'variable',
              note: 'Uma entrada que pode mudar sem editar o resto: como o parâmetro de uma função. Lida em outros lugares como `var.porta`.',
            },
            { text: '\n\n' },
            {
              text: 'resource "docker_image" "nginx" {\n  name = "nginx:1.27"\n}',
              label: 'resource',
              note: 'Um recurso que deve existir. O primeiro nome é o **tipo** (`docker_image`), o segundo é o **apelido** dentro do projeto (`nginx`). Juntos, formam o endereço `docker_image.nginx`.',
            },
            { text: '\n\n' },
            {
              text: 'resource "docker_container" "site" {\n  name  = "site-lab"\n  image = docker_image.nginx.image_id',
              label: 'Referência',
              note: 'Um recurso usando outro. Por causa dessa referência, o Terraform sabe que precisa baixar a imagem **antes** de criar o container.',
            },
            { text: '\n  ports {\n    internal = 80\n    external = var.porta\n  }\n}\n\n' },
            {
              text: 'output "endereco" {\n  value = "http://localhost:${var.porta}"\n}',
              label: 'output',
              note: 'Um valor mostrado no fim do `apply`, como o endereço do site ou o IP de um servidor. Também pode ser lido por outros projetos.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o arquivo: declare a variável, o recurso do container usando a variável e a saída com o endereço.',
          language: 'hcl',
          template:
            '[[variable]] "porta" {\n  type    = number\n  default = 8080\n}\n\n[[resource]] "docker_container" "site" {\n  name  = "site-lab"\n  image = docker_image.nginx.image_id\n  ports {\n    internal = 80\n    external = [[var.porta]]\n  }\n}\n\n[[output]] "endereco" {\n  value = "http://localhost:${var.porta}"\n}',
          explanation:
            'Quatro palavras cobrem a maior parte do que você vai ler: `provider` (com quem falar), `resource` (o que deve existir), `variable` (o que pode mudar) e `output` (o que mostrar no fim).',
        },
      ],
    },
    {
      id: 'plan-apply-destroy',
      title: 'Planejar, aplicar, destruir',
      blocks: [
        {
          type: 'text',
          text: 'O ciclo tem três comandos principais. `terraform plan` compara o código com a realidade e mostra o que **faria**, sem mexer em nada. `terraform apply` executa. `terraform destroy` apaga tudo que o projeto criou. Antes de tudo, `terraform init` baixa os providers.',
        },
        {
          type: 'anatomy',
          caption: 'Os símbolos de um plano. Leia o plano como leria um diff.',
          language: 'text',
          parts: [
            {
              text: '  # aws_s3_bucket.relatorios will be created\n  + resource "aws_s3_bucket" "relatorios" {\n      + bucket = "loja-relatorios"\n    }',
              label: '+ criar',
              note: 'O recurso não existe e vai ser criado. Valores que só se sabem depois aparecem como `(known after apply)`.',
            },
            { text: '\n\n' },
            {
              text: '  # aws_s3_bucket.dados will be updated in-place\n  ~ resource "aws_s3_bucket" "dados" {\n      ~ tags = { "ambiente" = "teste" -> "lab" }\n    }',
              label: '~ alterar',
              note: 'O recurso existe e será ajustado sem ser recriado. A seta mostra valor antigo e novo.',
            },
            { text: '\n\n' },
            {
              text: '  # aws_instance.antiga will be destroyed\n  - resource "aws_instance" "antiga" {',
              label: '- destruir',
              note: 'O recurso sai do código, então vai ser apagado. Leia com atenção: se for um banco, os dados vão junto.',
            },
            { text: '\n\n' },
            {
              text: '  # aws_instance.api must be replaced\n-/+ resource "aws_instance" "api" {\n      ~ ami = "ami-0aa1" -> "ami-0bb2" # forces replacement',
              label: '-/+ substituir',
              note: 'Algumas mudanças não podem ser feitas no lugar: o recurso é apagado e criado de novo. `forces replacement` aponta qual atributo causou isso. É o símbolo que mais merece cuidado.',
            },
            { text: '\n\n' },
            {
              text: 'Plan: 2 to add, 1 to change, 2 to destroy.',
              label: 'Resumo',
              note: 'A linha mais importante. Uma substituição conta duas vezes: uma em “add” e uma em “destroy”. Se você esperava só adicionar e aparece “to destroy”, pare e entenda antes de aplicar.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'O ciclo completo no laboratório Docker',
          task: 'Na pasta com o `main.tf` acima, crie o site, mude a porta e depois apague tudo. Leia cada saída antes de seguir.',
          prompt: 'voce@computador:~/lab-terraform$',
          steps: [
            {
              goal: 'Prepare a pasta: baixe o provider do Docker.',
              command: ['terraform init'],
              output:
                'Initializing the backend...\nInitializing provider plugins...\n- Finding kreuzwerker/docker versions matching "~> 3.0"...\n- Installing kreuzwerker/docker v3.0.2...\n\nTerraform has been successfully initialized!',
              hint: '`terraform init`.',
            },
            {
              goal: 'Gere o plano e salve-o no arquivo `plano.tfplan`, para aplicar exatamente o que você revisou.',
              command: ['terraform plan -out=plano.tfplan', 'terraform plan -out plano.tfplan'],
              output:
                'Terraform will perform the following actions:\n\n  # docker_container.site will be created\n  + resource "docker_container" "site" {\n      + id    = (known after apply)\n      + name  = "site-lab"\n      + ports {\n          + external = 8080\n          + internal = 80\n        }\n    }\n\n  # docker_image.nginx will be created\n  + resource "docker_image" "nginx" {\n      + name = "nginx:1.27"\n    }\n\nPlan: 2 to add, 0 to change, 0 to destroy.\n\nChanges to Outputs:\n  + endereco = "http://localhost:8080"\n\nSaved the plan to: plano.tfplan',
              hint: '`terraform plan -out=plano.tfplan`.',
            },
            {
              goal: 'Aplique o plano salvo.',
              command: ['terraform apply plano.tfplan', 'terraform apply "plano.tfplan"'],
              output:
                'docker_image.nginx: Creating...\ndocker_image.nginx: Creation complete after 6s\ndocker_container.site: Creating...\ndocker_container.site: Creation complete after 1s [id=4f2a9c71e0b3]\n\nApply complete! Resources: 2 added, 0 changed, 0 destroyed.\n\nOutputs:\n\nendereco = "http://localhost:8080"',
              hint: '`terraform apply plano.tfplan`.',
            },
            {
              goal: 'Veja o que mudaria se a porta fosse `9090`, passando a variável na linha de comando.',
              command: [
                'terraform plan -var="porta=9090"',
                "terraform plan -var='porta=9090'",
                'terraform plan -var porta=9090',
                'terraform plan -var=porta=9090',
              ],
              output:
                '  # docker_container.site must be replaced\n-/+ resource "docker_container" "site" {\n      ~ id   = "4f2a9c71e0b3" -> (known after apply)\n        name = "site-lab"\n      ~ ports { # forces replacement\n          ~ external = 8080 -> 9090 # forces replacement\n            internal = 80\n        }\n    }\n\nPlan: 1 to add, 0 to change, 1 to destroy.\n\nChanges to Outputs:\n  ~ endereco = "http://localhost:8080" -> "http://localhost:9090"',
              hint: '`terraform plan -var="porta=9090"`.',
            },
            {
              goal: 'Laboratório encerrado: apague tudo que o projeto criou, confirmando automaticamente.',
              command: ['terraform destroy -auto-approve'],
              output:
                'docker_container.site: Destroying... [id=4f2a9c71e0b3]\ndocker_container.site: Destruction complete after 1s\ndocker_image.nginx: Destroying...\ndocker_image.nginx: Destruction complete after 0s\n\nDestroy complete! Resources: 2 destroyed.',
              hint: '`terraform destroy -auto-approve`. Sem a opção, ele pede para você digitar `yes`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você só queria mudar a porta, e o plano diz `Plan: 1 to add, 0 to change, 1 to destroy`. O que isso significa?',
          options: [
            {
              text: 'O container vai ser apagado e criado de novo, porque a porta não pode mudar no lugar',
              correct: true,
              feedback:
                'Isso. É uma substituição (`-/+`). Para um container de site sem dados, tudo bem. Para um banco, seria preciso pensar em como não perder os dados antes de aplicar.',
            },
            {
              text: 'O Terraform vai criar um segundo container e manter o antigo',
              feedback:
                'Leia as duas metades: 1 a adicionar **e** 1 a destruir, sobre o mesmo recurso. O antigo sai.',
            },
            {
              text: 'Deu erro no plano',
              feedback:
                'Não é erro. Erros aparecem como `Error:` e o plano nem é gerado. Isso é o Terraform avisando exatamente o que vai fazer.',
            },
          ],
        },
      ],
    },
    {
      id: 'estado',
      title: 'O estado: a memória do Terraform',
      blocks: [
        {
          type: 'analogy',
          title: 'O caderninho do mercadinho',
          text: 'O dono do mercadinho do bairro anota no caderno quem levou o quê. Sem o caderno, ele não sabe que o pacote de arroz na sua sacola já foi registrado. O **estado** é o caderno do Terraform: liga cada bloco do código ao recurso real que ele criou.',
        },
        {
          type: 'text',
          text: 'O estado fica no arquivo `terraform.tfstate`. Lá está, por exemplo, que `docker_container.site` é o container de id `4f2a9c71e0b3`. É assim que o `plan` sabe o que já existe. Se o arquivo some, o Terraform acha que nada existe e tenta criar tudo de novo.',
        },
        {
          type: 'code',
          language: 'json',
          caption: 'Um trecho de terraform.tfstate',
          code: '{\n  "resources": [\n    {\n      "type": "docker_container",\n      "name": "site",\n      "instances": [\n        { "attributes": { "id": "4f2a9c71e0b3", "name": "site-lab" } }\n      ]\n    }\n  ]\n}',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nunca faça commit do estado',
          text: 'O estado guarda os atributos dos recursos **em texto puro**, inclusive senhas de banco e chaves geradas. Coloque `*.tfstate`, `*.tfstate.*` e a pasta `.terraform/` no `.gitignore`. O arquivo `.terraform.lock.hcl`, que trava as versões dos providers, esse sim vai para o Git.',
        },
        {
          type: 'text',
          text: 'Em equipe, o estado fica num **estado remoto** (*remote backend*): um lugar compartilhado e protegido, como um bucket com acesso restrito. Junto vem o **lock** (trava): enquanto alguém roda `apply`, ninguém mais consegue, para que dois planos não briguem pelo mesmo recurso.',
        },
        {
          type: 'code',
          language: 'hcl',
          caption: 'Estado remoto num bucket S3, com trava',
          code: 'terraform {\n  backend "s3" {\n    bucket       = "loja-terraform-estado"\n    key          = "producao/terraform.tfstate"\n    region       = "sa-east-1"\n    encrypt      = true\n    use_lockfile = true\n  }\n}',
        },
        {
          type: 'quiz',
          question:
            'Duas pessoas rodam `terraform apply` ao mesmo tempo, cada uma do seu computador, com o estado guardado só na própria máquina. O que pode acontecer?',
          options: [
            {
              text: 'Cada uma tem uma memória diferente do que existe, e uma pode desfazer ou duplicar o trabalho da outra',
              correct: true,
              feedback:
                'Isso. Com dois cadernos diferentes, cada `apply` acha que conhece a verdade. Estado remoto com trava dá um caderno só e uma pessoa por vez.',
            },
            {
              text: 'O Terraform junta as duas mudanças sozinho',
              feedback:
                'Ele não sabe que a outra pessoa existe. Cada execução só enxerga o próprio arquivo de estado.',
            },
            {
              text: 'Nada, porque o provedor de nuvem impede',
              feedback:
                'O provedor aceita pedidos de qualquer identidade com permissão. Quem evita a disputa é a trava do estado.',
            },
          ],
        },
      ],
    },
    {
      id: 'drift-e-modulos',
      title: 'Quando a realidade foge do código',
      blocks: [
        {
          type: 'text',
          text: '**Drift** (desvio) é quando o recurso real deixa de ser igual ao código, quase sempre porque alguém mudou algo direto no console. O próximo `plan` mostra a diferença e propõe **desfazer** a mudança manual, para voltar ao que está no código.',
        },
        {
          type: 'text',
          text: 'Para só enxergar o desvio, sem propor alterações, use `terraform plan -refresh-only`. Daí você decide: se a mudança manual era certa, leve-a para o código; se não era, rode o `apply` e deixe o Terraform restaurar.',
        },
        {
          type: 'reveal',
          question:
            'Durante um incidente, alguém aumentou a memória de um servidor pelo console. Uma semana depois, outra pessoa roda `terraform apply` para mudar outra coisa. O que acontece com a memória?',
          answer:
            'Volta para o valor do código, porque o Terraform faz a realidade igual ao arquivo. O servidor pode voltar a sofrer o mesmo problema. Por isso, toda mudança feita na mão numa emergência deve virar um pull request no código logo depois.',
        },
        {
          type: 'text',
          text: 'Quando um conjunto de recursos se repete (o mesmo site para staging e produção, por exemplo), você o transforma num **módulo**: uma pasta de arquivos `.tf` com variáveis de entrada, usada como uma função.',
        },
        {
          type: 'code',
          language: 'hcl',
          caption: 'O mesmo módulo usado duas vezes',
          code: 'module "site_staging" {\n  source = "./modules/site"\n  nome   = "site-staging"\n  porta  = 8081\n}\n\nmodule "site_producao" {\n  source = "./modules/site"\n  nome   = "site-producao"\n  porta  = 8080\n}',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma mudança segura de infraestrutura em equipe.',
          items: [
            'Editar os arquivos `.tf` numa branch',
            'Rodar `terraform plan` e ler o resumo',
            'Abrir um pull request com o plano no comentário',
            'Alguém revisa o código e o plano',
            'Após o merge, rodar `terraform apply` com o estado remoto travado',
          ],
          explanation:
            'O plano é revisado como se fosse código, porque é ele que diz o que vai acontecer de verdade. Muitos times rodam esse fluxo inteiro na CI.',
        },
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Erros que todo mundo comete uma vez',
      blocks: [
        {
          type: 'list',
          items: [
            '**Aplicar sem ler o plano.** O `apply` mostra o plano de novo e pede `yes`: leia o resumo, sempre.',
            '**Fazer commit do estado ou de senhas em variáveis.** Use variáveis sensíveis (`sensitive = true`) e um cofre de segredos.',
            '**Mexer pelo console em recursos do Terraform.** Gera drift e a mudança some no próximo `apply`.',
            '**Usar `-auto-approve` em produção.** No laboratório, ótimo. Em produção, quem aprova é uma pessoa lendo o plano.',
            '**Esquecer o `destroy` no laboratório de nuvem.** Recurso esquecido é cobrado todo mês.',
          ],
        },
        {
          type: 'classify',
          prompt: 'O que vai para o repositório Git e o que não vai?',
          buckets: ['Vai para o Git', 'Fica fora do Git'],
          items: [
            { text: '`main.tf` e `variables.tf`', bucket: 0 },
            { text: '`terraform.tfstate`', bucket: 1 },
            { text: '`.terraform.lock.hcl`', bucket: 0 },
            { text: 'A pasta `.terraform/` com os providers baixados', bucket: 1 },
            { text: 'Um arquivo `.tfvars` com a senha do banco', bucket: 1 },
            { text: 'A pasta `modules/` com seus módulos', bucket: 0 },
          ],
          explanation:
            'Vai para o Git o que descreve a infraestrutura e trava versões. Fica fora o que é gerado na máquina (providers baixados), o que guarda a realidade (estado) e qualquer segredo.',
        },
      ],
    },
  ],
  recap: [
    'Infraestrutura como código descreve recursos em arquivos versionados; o Terraform faz a realidade igual ao código.',
    'Um arquivo HCL tem `provider`, `resource`, `variable` e `output`, e referências definem a ordem de criação.',
    '`plan` mostra o que vai mudar com `+`, `~`, `-` e `-/+`; `apply` executa e `destroy` apaga tudo do projeto.',
    'O estado liga o código aos recursos reais, contém segredos, nunca vai para o Git e em equipe fica remoto e com trava.',
    'Drift é a realidade diferente do código; módulos reaproveitam conjuntos de recursos.',
  ],
  cards: [
    {
      id: 'iac',
      front: 'O que é infraestrutura como código?',
      back: 'Descrever servidores, redes e bancos em arquivos versionados, criados e alterados por uma ferramenta.',
    },
    {
      id: 'plan-apply',
      front: 'Qual a diferença entre `terraform plan` e `terraform apply`?',
      back: '`plan` só mostra o que mudaria; `apply` executa as mudanças.',
    },
    {
      id: 'substituir',
      front: 'O que significa `-/+` num plano?',
      back: 'O recurso será apagado e criado de novo, porque a mudança não pode ser feita no lugar.',
    },
    {
      id: 'tfstate',
      front: 'Para que serve o `terraform.tfstate`?',
      back: 'Guarda a ligação entre cada bloco do código e o recurso real criado.',
    },
    {
      id: 'estado-git',
      front: 'Por que o estado não vai para o Git?',
      back: 'Porque guarda atributos em texto puro, inclusive senhas, e em equipe deve ficar num backend remoto com trava.',
    },
    {
      id: 'lock',
      front: 'Para que serve a trava (lock) do estado?',
      back: 'Impede que duas execuções alterem o mesmo estado ao mesmo tempo.',
    },
    {
      id: 'drift',
      front: 'O que é drift?',
      back: 'Quando o recurso real fica diferente do código, em geral por mudança manual no console.',
    },
  ],
  mission: {
    title: 'Crie e apague um recurso por código',
    text: 'Use o laboratório Docker local, sem custo, para viver o ciclo completo do Terraform e documentar o que aprendeu.',
    steps: [
      'Instale o Terraform e crie um `main.tf` que sobe um container Nginx com a porta numa variável',
      'Rode `init`, `plan` e `apply` e escreva com suas palavras o que o plano dizia',
      'Mude a porta, leia o novo plano e explique por que o container é substituído',
      'Configure o `.gitignore` para deixar o estado e a pasta `.terraform/` fora do repositório',
      'Rode `destroy` e confirme com `docker ps` que nada ficou para trás',
    ],
  },
  sources: [
    {
      title: 'HashiCorp: Introdução ao Terraform',
      url: 'https://developer.hashicorp.com/terraform/intro',
    },
    {
      title: 'HashiCorp: Tutorial Terraform com Docker',
      url: 'https://developer.hashicorp.com/terraform/tutorials/docker-get-started',
    },
    {
      title: 'HashiCorp: State',
      url: 'https://developer.hashicorp.com/terraform/language/state',
    },
  ],
};
