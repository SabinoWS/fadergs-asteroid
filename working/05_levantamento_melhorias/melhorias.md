# Melhorias

Registro do que os clientes forem pedindo. Cada mensagem nova entra na seção **Em conversa**. O plano abaixo cobre as melhorias já decididas. A conversa pode continuar.

## Em conversa

### 1. Vida da nave e colisão

A nave tem 100 de vida. A barra fica na cauda, atrás do corpo. A nave colide com o asteroide.

Cada batida conta uma vez por contato. Separar e bater de novo conta outra. Encostar vários frames seguidos não drena a vida a cada frame.

- Asteroide pequeno: −10
- Asteroide maior: −25

A vida não passa de 0. Não foi pedido game over.

### 2. Asteroide gira

O asteroide gira enquanto se movimenta.

### 3. Asteroides pela frente e por trás

Além das laterais, asteroides entram pela borda de cima e pela borda de baixo.

### 4. Mais asteroides com o tempo

O intervalo inicial é 0,9 s e o máximo na tela é 5. A cada segundo o intervalo cai 0,02 s, até o mínimo de 0,32 s. A cada 10 segundos o máximo sobe 1, até 14.

### 5. Nave aponta para onde vai

A nave gira e o tiro sai da ponta, na direção em que ela aponta.

- Cima acelera nessa direção
- Baixo desacelera até parar
- Esquerda e direita viram a nave

### 6. WASD

W acelera, S desacelera, A vira à esquerda e D vira à direita. O mesmo efeito das setas.

### 7. Som

Tiro tem som. A explosão do asteroide, quando a vida chega a zero, tem som. Os sons são gerados no navegador.

### 8. Game over

Quando a vida da nave chega a zero, ela explode e a partida acaba. Aparece um botão para reiniciar.

### 9. Asteroide chefão

Aos 45 segundos aparece um chefão. Ele não sai da tela: persegue a nave até o jogador destruí-lo. Um contato com outro asteroide mata esse asteroide. Encostar na nave tira 50% da vida dela, 50 pontos de 100, uma vez por contato.

A vida do chefão não foi dita. Fica em 8, visível no centro, e cada tiro tira 1.

## Plano de ataque

As sete melhorias entram juntas em [06_melhorias_jogo](../06_melhorias_jogo/README.md), nesta ordem:

1. Vida, barra na cauda e colisão — melhoria 1.
2. Giro do asteroide — melhoria 2.
3. Entrada pelos quatro lados — melhoria 3.
4. Aumento da quantidade com o tempo — melhoria 4.
5. Pilotagem por direção com as setas — melhoria 5.
6. WASD — melhoria 6.
7. Sons de tiro e de explosão — melhoria 7.

Game over e o chefão entram em [07_game_over_chefao](../07_game_over_chefao/README.md):

1. Explosão, game over e reinício — melhoria 8.
2. Chefão aos 45 segundos — melhoria 9.
