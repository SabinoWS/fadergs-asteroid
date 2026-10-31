# 04_melhorias_visuais

A nave e os asteroides passam a usar as imagens de `src/assets`. O tamanho desenhado de cada asteroide segue o raio daquele tipo.

Status: concluído

## Requisitos

- [x] A nave no canvas é `src/assets/ship.png`.
- [x] O asteroide no canvas é `src/assets/asteroid.png`.
- [x] O asteroide maior é desenhado maior que o menor.
- [x] A largura do sprite acompanha o raio: 42 no maior e 16 no menor.
- [x] O número da vida continua visível sobre o asteroide.

## Desenvolvimento

- [x] Desenhar `ship.png` no lugar do triângulo, com o tiro saindo da ponta.
- [x] Desenhar `asteroid.png` no lugar do polígono.
- [x] Calcular a largura de cada sprite para o desenho coincidir com o raio daquele tipo.
- [x] Manter o número da vida por cima da imagem.

## Testes

- [x] A nave aparece como a arte da imagem.
- [x] Os dois tamanhos aparecem como a arte do asteroide.
- [x] Na tela, o maior ocupa mais área que o menor.
- [x] Dá para ler a vida do maior e a vida do menor.
