# 06_melhorias_jogo

Vida da nave, colisão, giro, asteroides nos quatro lados, aumento com o tempo, pilotagem por direção, WASD e sons. As decisões estão em [melhorias](../05_levantamento_melhorias/melhorias.md).

Status: não iniciado

## Entrega 1 — Vida e colisão

### Requisitos

- [ ] A nave começa com 100 de vida.
- [ ] A barra fica na cauda da nave.
- [ ] Bater num asteroide pequeno tira 10.
- [ ] Bater num asteroide maior tira 25.
- [ ] Encostar sem separar não tira vida de novo.
- [ ] A vida para em 0.

### Desenvolvimento

- [ ] Guardar a vida da nave.
- [ ] Desenhar a barra atrás da cauda.
- [ ] Detectar o contato da nave com o asteroide.
- [ ] Aplicar o dano uma vez por contato.

### Testes

- [ ] A barra aparece cheia atrás da nave.
- [ ] Um contato com o pequeno deixa a vida em 90.
- [ ] Um contato com o maior deixa a vida em 75, partindo de 100.
- [ ] Continuar encostado não reduz de novo no frame seguinte.

## Entrega 2 — Giro

### Requisitos

- [ ] O asteroide gira enquanto anda.

### Desenvolvimento

- [ ] Somar um giro ao ângulo do asteroide a cada frame.
- [ ] Desenhar a imagem já rotacionada.

### Testes

- [ ] Em dois instantes, a arte do mesmo asteroide está em ângulos diferentes.

## Entrega 3 — Quatro lados

### Requisitos

- [ ] Asteroides entram pela esquerda, direita, cima e baixo.

### Desenvolvimento

- [ ] Alternar o lado de surgimento entre os quatro.
- [ ] Mover os de cima para baixo e os de baixo para cima.

### Testes

- [ ] Há asteroides com movimento horizontal e asteroides com movimento vertical.

## Entrega 4 — Mais com o tempo

### Requisitos

- [ ] O intervalo começa em 0,9 s e não passa de 0,32 s.
- [ ] O máximo começa em 5 e sobe 1 a cada 10 s, até 14.

### Desenvolvimento

- [ ] Calcular o intervalo e o máximo a partir do tempo de jogo.

### Testes

- [ ] No início o intervalo é 0,9 s e o máximo é 5.
- [ ] Com 10 s decorridos o máximo é 6 e o intervalo é menor que 0,9 s.

## Entrega 5 — Direção

### Requisitos

- [ ] Esquerda e direita viram a nave.
- [ ] Cima acelera para onde a ponta aponta.
- [ ] Baixo reduz a velocidade até parar.
- [ ] O tiro sai da ponta na direção da nave.

### Desenvolvimento

- [ ] Trocar o deslocamento direto por giro, aceleração e freio.
- [ ] Rotacionar a imagem da nave.
- [ ] Disparar o tiro no ângulo atual.

### Testes

- [ ] Segurar a seta direita gira a nave.
- [ ] Segurar cima depois do giro desloca a nave para a frente da ponta.
- [ ] Segurar baixo diminui a velocidade.
- [ ] O tiro segue a ponta, não só para cima.

## Entrega 6 — WASD

### Requisitos

- [ ] W acelera, S desacelera, A vira à esquerda e D vira à direita.

### Desenvolvimento

- [ ] Ler KeyW, KeyA, KeyS e KeyD com o mesmo efeito das setas.

### Testes

- [ ] Segurar D gira a nave para o mesmo lado que a seta direita.
- [ ] Segurar A gira para o lado oposto.

## Entrega 7 — Sons

### Requisitos

- [ ] O tiro tem som.
- [ ] O asteroide que chega a vida zero tem som de explosão.

### Desenvolvimento

- [ ] Tocar um som curto ao disparar.
- [ ] Tocar um som de explosão quando a vida do asteroide chega a zero.

### Testes

- [ ] Pressionar espaço cria um som de tiro.
- [ ] Destruir um asteroide cria um som de explosão.
