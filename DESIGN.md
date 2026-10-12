# Trilha Info: interface de aprendizagem

## Overview

Interface de produto para estudar por períodos longos, inclusive à noite e em celulares. Uma superfície escura com referências legíveis, orientação persistente no desktop e índice compacto no mobile. A iluminação ambiente varia discretamente com o horário local e tem preferência manual.

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

Tokens e regras responsivas estão em `src/components/LearningWorkspace/workspace.css`. A cor de marca existente continua em `tailwind.config.js`.

## Typography

Hanken Grotesk com fallback system-ui. Escala em rem, h1 de 3rem no desktop e 2.25rem no celular. Texto corrido de 1rem com entrelinha 1.7 e largura de até 72ch. Fonte monoespaçada continua disponível para exemplos de código.

## Components

Controles de visualização e profundidade usam botões com `aria-pressed`. Referências são links reais e possuem um checkbox separado de estudo. Práticas possuem conclusão própria. Ferramentas de estudo, referências extras e prompts usam expansões nativas. Bordas para superfícies de navegação; sombra curta apenas no conteúdo ativo.

## Layout

Conteúdo central limitado a 1280px. No desktop, índice de 252px e conteúdo flexível. No celular, uma coluna sem rolagem horizontal. Mapa usa etapas ordenadas e conexões discretas; Lista oferece leitura contínua. Etapas opcionais possuem identificação textual.

## Motion

Framer Motion interpola posições do ramo ativo por 180ms. Vidro fica restrito à barra de ferramentas no desktop. Perspectiva de 1000px e elevação de 3px em dispositivos com hover. `prefers-reduced-motion` e o controle de efeitos desativam movimento; elementos continuam visíveis.
