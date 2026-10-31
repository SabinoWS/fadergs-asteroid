# 03_implementacao_inicial

Primeira versão jogável do Asteroids no canvas: nave, asteroides e tiro. As decisões estão em [funcionalidades](../02_levantamento_requisitos/funcionalidades.md).

Status: concluído

Fora deste checklist: colisão da nave com o asteroide, pontuação, vidas da nave, game over e áudio.

## Entrega 1 — Nave

### Requisitos

- [x] A nave aparece no canvas.
- [x] A seta para cima move a nave para cima.
- [x] A seta para baixo move a nave para baixo.
- [x] A seta para a esquerda move a nave para a esquerda.
- [x] A seta para a direita move a nave para a direita.

### Desenvolvimento

- [x] Desenhar a nave no canvas.
- [x] Ler as quatro setas do teclado.
- [x] Atualizar a posição da nave a cada frame conforme a tecla pressionada.

### Testes

- [x] Com a página aberta, a nave está visível.
- [x] Segurar cada seta desloca a nave só na direção daquela tecla.
- [x] Soltar a tecla interrompe o movimento daquela direção.

## Entrega 2 — Asteroides

### Requisitos

- [x] Asteroides entram pela lateral esquerda e pela lateral direita da tela.
- [x] Existem asteroides de tamanho maior e de tamanho menor.
- [x] O asteroide maior é mais lento que o menor.
- [x] O asteroide menor é mais rápido que o maior.
- [x] A vida do asteroide é diferente conforme o tamanho.

### Desenvolvimento

- [x] Criar asteroides nos dois tamanhos.
- [x] Fazer o surgimento a partir das laterais.
- [x] Associar velocidade menor ao tamanho maior e velocidade maior ao tamanho menor.
- [x] Associar um valor de vida a cada tamanho.

### Testes

- [x] Em uma partida, asteroides surgem dos dois lados da tela.
- [x] Os dois tamanhos aparecem na tela.
- [x] No mesmo intervalo, o menor percorre mais distância que o maior.
- [x] O valor de vida do maior é diferente do valor de vida do menor.

## Entrega 3 — Tiro

O tiro sobe, na direção da ponta da nave. Cada acerto reduz 1 de vida. Com vida zero, o asteroide sai da tela. O maior tem vida 3 e o menor tem vida 1.

### Requisitos

- [x] A tecla espaço dispara um tiro a partir da nave.
- [x] A direção do tiro está definida no levantamento antes da implementação.
- [x] Está definido se o tiro altera a vida do asteroide e o que acontece quando a vida chega a zero.

### Desenvolvimento

- [x] Ler a tecla espaço.
- [x] Criar o tiro na posição da nave e movê-lo na direção decidida.
- [x] Aplicar na vida do asteroide só o efeito que tiver sido decidido.

### Testes

- [x] Pressionar espaço faz um tiro sair da nave.
- [x] O tiro segue a direção registrada no levantamento.
- [x] Se o tiro alterar a vida, o valor muda como foi decidido. Se não alterar, a vida permanece igual depois do encontro.
