# Levantamento de tecnologias

Jogo Asteroids no navegador, publicado como site estático na Netlify. Este arquivo compara opções e registra a sugestão. A escolha final entra no checklist deste início: [README](./README.md).

## O que o jogo pede

O Asteroids original é um jogo de vetores: nave que gira e acelera, inércia, tiros, asteroides que se partem, tela que continua do outro lado, pontuação e vidas.

Isso define a tecnologia mais do que o contrário:

- Poucas formas na tela, desenhadas com linha. Não é um jogo de centenas de sprites.
- A física é a regra do jogo: velocidade, rotação, atrito leve, wrap da tela, colisão e quebra do asteroide. Um motor de física pronto (plataforma, gravidade, tilemap) não cobre esse modelo.
- Tudo roda no cliente. A primeira versão não precisa de servidor, banco nem login.
- O placar local cabe em `localStorage`. Ranking global fica para uma funcionalidade futura.

## O que a Netlify pede

A Netlify publica o resultado de um build estático. Para este jogo basta:

- um comando de build
- um diretório de publicação
- `netlify.toml` na raiz com esses dois valores
- `.gitignore` incluindo dependências, a pasta de build e `.netlify`

Não precisa de adapter, Functions nem redirect de SPA enquanto o jogo for uma única página. Functions e banco só entram se existir ranking online ou conta de jogador.

## Opções

### Vite + TypeScript + Canvas 2D

Aplicação de uma página. O loop do jogo usa `requestAnimationFrame`. O desenho usa a API 2D do canvas (`beginPath`, `lineTo`, `stroke`), que reproduz o visual de vetores do original.

A Vite entrega servidor local, TypeScript e um `dist/` estático. Na Netlify o build é `npm run build` e a publicação é `dist`.

O jogo em si fica em módulos: nave, tiro, asteroide, colisão, pontuação. A lógica pura (wrap, colisão, quebra, pontuação) pode ser testada sem abrir o navegador.

### HTML + Canvas, sem empacotador

Um `index.html` e poucos arquivos `.js`, publicados direto. A Netlify não roda build.

Serve para um protótipo curto. A partir de várias entidades, input, áudio e telas (menu, jogo, game over), a falta de módulos e de TypeScript atrapalha.

### Phaser 3

Framework de jogos 2D: cenas, input, áudio, câmera, física arcade e animações. O build continua estático e a Netlify publica o `dist` do Vite, que é o empacotador usual do Phaser.

A física arcade do Phaser é voltada a retângulos e círculos com gravidade. A nave do Asteroids, o wrap e a quebra dos asteroides continuam código nosso. O framework pesa no download e na API sem tirar a parte difícil.

Faz sentido se o projeto crescer para várias cenas, partículas, tween de UI e mais de um jogo no mesmo casco.

### PixiJS

Renderizador WebGL para muitos sprites. Asteroids desenha poucos polígonos por frame. Canvas 2D já sustenta 60 fps nesse volume e o traço vetorial sai direto da API. PixiJS entra bem num jogo com arte raster, não neste.

### Kaplay

API pequena e direta para jogos 2D no navegador, sucessora comunitária do Kaboom. Bom para protótipo rápido. O modelo ainda é o de um framework (gravidade, corpos, cenas). A física do Asteroids continua manual, com uma comunidade menor que a do Phaser.

### p5.js

Biblioteca de código criativo. O `draw()` vira o loop e desenhar linhas é simples. Útil para aprender canvas. Cenas, estado de jogo, colisão e empacote para a Netlify ficam por nossa conta, em cima de uma API pensada para sketch, não para jogo.

### Godot exportado para web

Engine completa, com editor e GDScript ou C#. O export HTML5 gera WASM. Na Netlify funciona como site estático, mas o download é grande e o áudio e o carregamento no navegador dão mais trabalho. Threads do Godot ainda pedem headers `Cross-Origin-Opener-Policy` e `Cross-Origin-Embedder-Policy` no `netlify.toml`.

Vale a pena se a meta for aprender Godot. Para um Asteroids no navegador, a engine é maior que o jogo.

### Unity WebGL

Export web pesado, carregamento lento e fluxo de build distante de um repositório estático simples. Não combina com este escopo.

### React, Vue ou Svelte em volta do canvas

Úteis para menu e placar se a interface crescer. O loop do jogo não pode depender do render do framework: o canvas precisa de uma ref e de um loop próprio. Para a primeira versão, HTML e canvas resolvem menu, HUD e game over sem um segundo modelo de UI.

## Comparação

| Opção | Encaixa no Asteroids | Publicação na Netlify | Peso | Quando escolher |
|---|---|---|---|---|
| Vite + TypeScript + Canvas 2D | A física e o traço vetorial ficam no nosso código, que é o jogo | `npm run build`, publicar `dist` | Baixo | Primeira versão |
| HTML + Canvas sem build | Igual, com menos estrutura | Publicar a pasta, sem build | Mínimo | Protótipo de um dia |
| Phaser 3 | Motor ajuda cenas e áudio; a física do jogo continua nossa | `dist` estático | Alto | Várias cenas ou mais jogos |
| PixiJS | Render forte demais para poucos polígonos | `dist` estático | Médio | Jogo com muitos sprites |
| Kaplay | API curta; física do Asteroids continua manual | `dist` estático | Baixo | Protótipo com framework |
| p5.js | Desenho fácil; estrutura de jogo é nossa | `dist` ou página solta | Baixo | Estudo de canvas |
| Godot web | Engine inteira para um jogo pequeno | Estático + headers COOP/COEP | Alto | Aprender Godot |
| Unity WebGL | Engine inteira, export pesado | Estático, carregamento lento | Muito alto | Fora deste projeto |

## Sugestão

Usar **Vite, TypeScript e Canvas 2D**, com **npm**.

- A regra do jogo é a simulação. Um motor de física pronto não substitui wrap, inércia e quebra dos asteroides.
- O visual original é linha sobre fundo preto. A API 2D do canvas desenha isso sem textura nem WebGL.
- TypeScript segura as entidades (nave, tiro, asteroide, estado da partida) quando o código crescer.
- A Vite gera um site estático. A Netlify só precisa do build e do diretório `dist`.
- npm é o fluxo padrão da Netlify, sem configuração extra de gerenciador.

Áudio da primeira versão: Web Audio API, com osciladores curtos para tiro, explosão e empurrão. Uma biblioteca de áudio só se entrarem arquivos longos ou trilha.

Input da primeira versão: teclado (girar, acelerar, atirar). Toque na tela fica para outra funcionalidade.

Testes da lógica: Vitest nas funções puras (posição depois do wrap, colisão, pontos ao quebrar, vidas ao colidir). O jogo na tela se valida jogando.

## Deixar para depois

- Ranking global: Netlify Functions e Netlify Database. Não faz parte do jogo jogável.
- Conta de jogador: Netlify Identity, só se o ranking precisar de usuário.
- Phaser, se o casco do jogo ganhar muitas cenas, partículas e telas que o canvas puro deixe de organizar.
- Controles de toque, pausa, áudio com arquivos e tela cheia.

## Como isso entra no início do projeto

O checklist [README](./README.md) desta pasta ainda marca a stack como decisão em aberto. A sugestão deste levantamento é a base dessa decisão: Vite, TypeScript, Canvas 2D e npm, com build estático na Netlify.
