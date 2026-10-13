# Trilha Info: interface de aprendizagem

## Overview

Interface de produto para estudar por períodos longos, inclusive à noite e em celulares. Uma superfície escura com referências legíveis, orientação persistente no desktop e índice compacto no mobile. A iluminação ambiente varia discretamente com o horário local e tem preferência manual. O trajeto é representado como uma estrada: o estudante vê onde está, o que já percorreu e onde cada trecho termina.

## Color Palette & Roles

| Papel                  | Cor       |
| ---------------------- | --------- |
| Fundo                  | `#171316` |
| Superfície ativa       | `#211B20` |
| Painel de navegação    | `#1B161A` |
| Texto                  | `#FDFDFD` |
| Texto secundário       | `#C5B9C1` |
| Linha                  | `#493B44` |
| Acento legível e foco  | `#FF83C5` |
| Marca e ação principal | `#E1047B` |
| Desenvolvimento com IA | `#91E4C6` |

Tokens do site estão em `src/site.css`; os do espaço de estudo, em `src/components/LearningWorkspace/workspace.css`. A cor de marca existente continua em `tailwind.config.js`. Um ruído sutil fixo quebra a superfície plana sem interceptar ponteiro.

## Typography

Títulos em Bricolage Grotesque (700, tracking negativo); interface e texto corrido em Hanken Grotesk, ambos com fallback system-ui. h1 da trilha entre 2.5rem e 3.75rem, h1 da página inicial até 5.25rem. Texto corrido de 1rem com entrelinha 1.7 e largura de até 72ch. Números de progresso usam algarismos tabulares. Fonte monoespaçada continua disponível para exemplos de código.

## Components

Controles de visualização e profundidade usam botões com `aria-pressed`; o seletor de visualização tem ícone, texto e um indicador que desliza entre as opções. O progresso geral aparece como anel com porcentagem e um `progress` acessível. Referências são links reais em linhas com checkbox separado de estudo. Práticas possuem conclusão própria, exibida como pílula. Ferramentas de estudo, referências extras e prompts usam expansões nativas.

## Layout

Conteúdo central limitado a 1280px. Cabeçalho do site fixo de 64px, translúcido. O Mapa é a entrada de novas sessões; preferências anteriores são preservadas.

O Mapa desenha uma estrada SVG entre os centros reais das estações, medidos do layout (`offsetLeft`/`offsetTop`, imunes a transformações) e recalculados com `ResizeObserver`. As estações oscilam suavemente em torno de um eixo; o texto fica sempre à direita do ponto. Cada trecho começa com um marco numerado e termina em um projeto (marcador quadrado com bandeira); práticas de IA são estações verdes no próprio percurso, na ordem editorial; o fim da estrada é o resultado esperado da trilha. O segmento até o próximo passo é preenchido em magenta. Estado nunca depende só da cor: concluído usa ✓ e texto, o ponto atual tem rótulo “Você está aqui” e `aria-current`, progresso parcial aparece como arco e como contagem.

No desktop, uma coluna lateral fixa de 316px mostra próximo passo, trechos com barras de progresso e legenda. Abaixo de 1180px ela passa para o topo; no celular, os trechos viram uma faixa horizontal e a legenda começa recolhida. A estrada continua vertical, sem pan ou zoom obrigatório. Aprofundamentos opcionais ficam fora da estrada, como desvios com contorno tracejado; não aumentam o total obrigatório.

Estudar mantém índice de 264px e conteúdo flexível no desktop, com uma coluna no celular. Os passos de um assunto formam uma linha do tempo numerada que marca ✓ quando concluídos. Abrir um assunto ou prática de IA e voltar ao Mapa restaura o foco no controle original. Lista oferece leitura contínua. O tipo editorial do conteúdo e o uso de IA são campos independentes da obrigatoriedade.

A página inicial mostra uma ilustração da estrada no hero, cartões de trilha com miniatura do percurso e, quando há progresso salvo, “Continuar” com a porcentagem (resumo leve em `trilha-progress:v1`, sem carregar catálogos).

## Motion

Movimento acontece uma vez e nunca em laço contínuo. Na primeira abertura do Mapa por sessão, a estrada percorrida se desenha (1.5s) e as estações chegam em cascata (40ms entre elas); o ponto atual emite três pulsos. Hover eleva cartões com mola curta e destaca bordas sob o cursor na página inicial. Framer Motion interpola o ramo ativo por 180ms e o indicador de visualização. Vidro fica restrito ao cabeçalho e à barra de ferramentas fixa no desktop. `prefers-reduced-motion` e o controle de efeitos desativam movimento e brilho; elementos continuam visíveis.
