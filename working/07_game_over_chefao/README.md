# 07_game_over_chefao

A nave explode ao zerar a vida, com botão para reiniciar. Aos 45 segundos entra um chefão que persegue o jogador. As decisões estão em [melhorias](../05_levantamento_melhorias/melhorias.md).

Status: concluído

## Entrega 1 — Game over

### Requisitos

- [x] Com a vida em zero, a nave explode.
- [x] A partida para e aparece Game Over.
- [x] O botão Reiniciar começa outra partida com vida 100 e sem chefão.

### Desenvolvimento

- [x] Estourar a nave e tocar a explosão quando a vida chega a zero.
- [x] Mostrar a tela com o botão.
- [x] Recriar o estado do jogo ao clicar em Reiniciar.

### Testes

- [x] Depois de zerar a vida, a nave some numa explosão e o botão aparece.
- [x] Clicar em Reiniciar tira o Game Over e devolve a nave com a barra cheia.
- [x] O contador do chefão volta a 45.

## Entrega 2 — Chefão

### Requisitos

- [x] Um contador de 45 segundos fica visível até o chefão aparecer.
- [x] O chefão persegue a nave e não deixa a tela.
- [x] O contato do chefão mata o outro asteroide.
- [x] O contato do chefão tira 50 de vida da nave, uma vez por contato.
- [x] Cada tiro tira 1 de vida do chefão. Em zero, ele explode e some.

### Desenvolvimento

- [x] Contar 45 segundos e desenhar o tempo restante.
- [x] Criar o chefão maior, com a rocha em vermelho e vida 8, sem quadrado em volta.
- [x] Mover o chefão em direção à nave, limitado à tela.
- [x] Apagar o asteroide que encostar no chefão.
- [x] Aplicar 50 de dano na nave, uma vez por contato.
- [x] Aceitar tiros no chefão.

### Testes

- [x] O texto do contador diminui a cada segundo.
- [x] Aos 45 segundos o chefão está na tela e anda para a nave.
- [x] Um asteroide que cruza o chefão some.
- [x] Encostar no chefão reduz a barra pela metade.
- [x] O chefão some depois de 8 tiros.
