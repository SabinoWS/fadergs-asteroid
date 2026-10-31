# 01_inicio_projeto

Base do jogo Asteroids no navegador: objetivo escrito, stack escolhida, app sobe localmente e o build está pronto para a Netlify. O levantamento está em [tecnologias](./tecnologias.md).

Status: concluído

## Requisitos

- [x] O README da raiz descreve, em uma frase, o objetivo do projeto, para quem ele é e qual problema resolve.
- [x] A stack está escolhida e registrada no README: linguagem, framework e gerenciador de pacotes.
- [x] O projeto sobe localmente com um único comando, e esse comando está documentado no README.
- [x] O build de produção gera o artefato publicado na Netlify, com `netlify.toml` definindo comando de build e diretório de publicação.
- [x] `.gitignore` exclui dependências, artefato de build e a pasta `.netlify`.
- [x] Funcionalidades seguintes entram só como novas pastas em `working/`, cada uma com requisitos, desenvolvimento e testes.

## Desenvolvimento

- [x] Escrever o objetivo do projeto no README da raiz.
- [x] Escolher a stack a partir de [tecnologias](./tecnologias.md) e registrá-la no README.
- [x] Criar a estrutura inicial da aplicação com o ponto de entrada.
- [x] Documentar o comando para subir localmente e o comando de build.
- [x] Adicionar `netlify.toml` com comando de build e diretório de publicação.
- [x] Adicionar `.gitignore` cobrindo dependências, build e `.netlify`.

## Testes

- [x] O README da raiz contém objetivo, stack, comando local e comando de build.
- [x] O comando local sobe a aplicação sem erro.
- [x] O comando de build conclui sem erro e gera o diretório publicado.
- [x] `git status` não lista dependências, artefato de build nem `.netlify`.
- [x] `netlify.toml` aponta o comando de build e o diretório gerado no teste anterior.
