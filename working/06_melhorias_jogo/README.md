# 06_melhorias_jogo

Vida da nave, colisão, giro, asteroides nos quatro lados, aumento com o tempo, pilotagem por direção, WASD e sons. As decisões estão em [melhorias](../05_levantamento_melhorias/melhorias.md).

Status: concluído

## Entrega 1 — Vida e colisão

### Requisitos

- [x] A nave começa com 100 de vida.
- [x] A barra fica na cauda da nave.
- [x] Bater num asteroide pequeno tira 10.
- [x] Bater num asteroide maior tira 25.
- [x] Encostar sem separar não tira vida de novo.
- [x] A vida para em 0.

### Desenvolvimento

- [x] Guardar a vida da nave.
- [x] Desenhar a barra atrás da cauda.
- [x] Detectar o contato da nave com o asteroide.
- [x] Aplicar o dano uma vez por contato.

### Testes

- [x] A barra aparece cheia atrás da nave.
- [x] Um contato com o pequeno deixa a vida em 90.
- [x] Um contato com o maior deixa a vida em 75, partindo de 100.
- [x] Continuar encostado não reduz de novo no frame seguinte.

## Entrega 2 — Giro

### Requisitos

- [x] O asteroide gira enquanto anda.

### Desenvolvimento

- [x] Somar um giro ao ângulo do asteroide a cada frame.
- [x] Desenhar a imagem já rotacionada.

### Testes

- [x] Em dois instantes, a arte do mesmo asteroide está em ângulos diferentes.

## Entrega 3 — Quatro lados

### Requisitos

- [x] Asteroides entram pela esquerda, direita, cima e baixo.

### Desenvolvimento

- [x] Sortear o lado e o ponto da borda em que cada asteroide entra.
- [x] Mover os de cima para baixo e os de baixo para cima.

### Testes

- [x] Há asteroides com movimento horizontal e asteroides com movimento vertical.

## Entrega 4 — Mais com o tempo

### Requisitos

- [x] O intervalo começa em 0,9 s e não passa de 0,32 s.
- [x] O máximo começa em 5 e sobe 1 a cada 10 s, até 14.

### Desenvolvimento

- [x] Calcular o intervalo e o máximo a partir do tempo de jogo.

### Testes

- [x] No início o intervalo é 0,9 s e o máximo é 5.
- [x] Com 10 s decorridos o máximo é 6 e o intervalo é menor que 0,9 s.

## Entrega 5 — Direção

### Requisitos

- [x] Esquerda e direita viram a nave.
- [x] Cima acelera para onde a ponta aponta.
- [x] Baixo reduz a velocidade até parar.
- [x] O tiro sai da ponta na direção da nave.

### Desenvolvimento

- [x] Trocar o deslocamento direto por giro, aceleração e freio.
- [x] Rotacionar a imagem da nave.
- [x] Disparar o tiro no ângulo atual.

### Testes

- [x] Segurar a seta direita gira a nave.
- [x] Segurar cima depois do giro desloca a nave para a frente da ponta.
- [x] Segurar baixo diminui a velocidade.
- [x] O tiro segue a ponta, não só para cima.

## Entrega 6 — WASD

### Requisitos

- [x] W acelera, S desacelera, A vira à esquerda e D vira à direita.

### Desenvolvimento

- [x] Ler KeyW, KeyA, KeyS e KeyD com o mesmo efeito das setas.

### Testes

- [x] Segurar D gira a nave para o mesmo lado que a seta direita.
- [x] Segurar A gira para o lado oposto.

## Entrega 7 — Sons

### Requisitos

- [x] O tiro tem som.
- [x] O asteroide que chega a vida zero tem som de explosão.

### Desenvolvimento

- [x] Tocar um som curto ao disparar.
- [x] Tocar um som de explosão quando a vida do asteroide chega a zero.

### Testes

- [x] Pressionar espaço cria um som de tiro.
- [x] Destruir um asteroide cria um som de explosão.
