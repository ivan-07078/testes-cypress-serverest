# Testes E2E do ServeRest

Projeto acadêmico para configurar o Cypress e exercitar fluxos funcionais da
tela de login do ServeRest, sem criar contas nem alterar dados no serviço
externo.

## Aplicação e tecnologias

- Aplicação analisada: <https://front.serverest.dev/login>
- Node.js e npm
- JavaScript e Cypress 16

Os seletores dos testes usam os atributos `data-testid` encontrados na
interface publicada. O endereço base configurado no Cypress é
`https://front.serverest.dev`.

## Instalação

Com Node.js e npm instalados, execute na raiz do projeto:

```bash
npm install
```

## Executar os testes

Abra a interface interativa do Cypress:

```bash
npm run test:e2e:open
```

Execute os testes em modo headless:

```bash
npm run test:e2e
```

O comando `npm test` também executa a suíte headless. O reporter `spec` mostra
no terminal os arquivos, cenários e resultados aprovados ou reprovados. Por
padrão, o Cypress salva capturas de tela de falhas em `cypress/screenshots/`.

## Cenários

- `cypress/e2e/login.cy.js`: abertura da tela, presença dos campos e botão,
	envio sem preencher, bloqueio de email inválido e exibição do erro para
	credenciais incorretas.
- `cypress/e2e/cadastro.cy.js`: navegação entre login e cadastro, presença dos
	campos, bloqueio de email inválido, mensagem de sucesso simulada e retorno ao
	login.

Os testes de erro de login interceptam o POST e fornecem uma resposta controlada
para exercitar a interface sem depender da API externa. A mensagem verificada é
a fixture do teste; ela não comprova mensagens ou autenticação retornadas pelo
serviço real. O cenário de sucesso do cadastro também intercepta o POST, sem
criar um usuário real. O cenário de email inválido verifica a validação nativa
do campo antes do envio.