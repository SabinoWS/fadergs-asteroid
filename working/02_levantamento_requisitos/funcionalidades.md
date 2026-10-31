# Funcionalidades

Registro do que os analistas forem descrevendo. Cada mensagem nova entra na seção **Em conversa**. O plano abaixo cobre só a implementação inicial já decidida. A conversa pode continuar.

## Em conversa

### 1. Nave pilotável

A nave é pilotada pelas setas do teclado: cima, baixo, esquerda e direita.

### 2. Asteroides pelas laterais

Existem asteroides. Eles entram pelas laterais da tela.

### 3. Tamanhos

Há asteroides maiores e menores.

### 4. Velocidade pelo tamanho

A velocidade depende do tamanho. O maior é mais lento. O menor é mais rápido.

### 5. Vida pelo tamanho

Cada asteroide tem uma vida diferente conforme o tamanho. O maior tem mais vida: 3. O menor tem 1.

### 6. Tiro

A nave atira com a tecla espaço. Cada pressionamento dispara um tiro.

O tiro segue para cima, a direção da ponta da nave. Cada acerto reduz 1 de vida do asteroide. Com vida zero, o asteroide sai da tela.

Fora desta implementação inicial: colisão da nave com o asteroide, pontuação, vidas da nave, game over e áudio.

## Plano de ataque

A implementação inicial é uma pasta só, em três entregas. O checklist está em [03_implementacao_inicial](../03_implementacao_inicial/README.md).

1. **Nave** — funcionalidade 1. A nave se move com as quatro setas.
2. **Asteroides** — funcionalidades 2, 3, 4 e 5. Entram pelas laterais, em tamanho maior e menor, com velocidade e vida conforme o tamanho.
3. **Tiro** — funcionalidade 6. A tecla espaço dispara para cima. O acerto reduz a vida e zera o asteroide.
