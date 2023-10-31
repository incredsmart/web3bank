# :construction: Web3 Cash Machine (WIP) :construction:

## 1 Sobre

Esse projeto consiste de um contrato inteligente que simula um caixa eletrônico. Por meio do front-end, é possível interagir com os métodos do contrato por meio da biblioteca web3.js e realizar operações básicas como: saque, depósito e checar saldo.

Projeto desenvolvido como atividade avaliativa da disciplina TAC 2 (Tópicos Avançados em Computação 2) ministrada pelo professor Jorge Lima.

## 2 Organização

O projeto está dividido em duas pastas: **client** e **server**.

No **server** se encontram os arquivos do projeto truffle e no **client** se encontram os arquivos do projeto front-end que irá interagir com por meio dos métodos do contrato.

### Estrutura

- Client
  - images: contém imagens utilizadas no projeto
  - styles: contém as regras de estilo do projeto
  - js: contém os scripts necessários para que o projeto interaja com o contrato inteligente entre outras funcionalidades básicas

- Server
  - build
    - contracts: é aonde ficam as builds do contratos após a migração
  - contracts: aonde ficam os contratos inteligentes
  - migrations: aqui ficam os scripts para deploy dos contratos
  - test: aqui ficam os scripts de testes dos seus contratos


## 3 Como rodar o projeto na sua máquina

Para rodar o projeto, é necessário ter as seguintes ferramentas instaladas na sua máquina:

- O [NodeJS](https://nodejs.org/en) para instalar as dependências a seguir
- [Ganache](https://github.com/trufflesuite/ganache) instalado globalmente por meio do NPM (é instalado junto com o NodeJS)
- O Ambiente de desenvolvimento [Truffle](https://www.npmjs.com/package/truffle)
- Um editor de código não é obrigatório, mas em caso de necessidade, é recomendado o [VS Code](https://code.visualstudio.com)
--- 

Tendo as ferramentas básicas instaladas na sua máquina, agora é só rodar o projeto seguindo os seguintes passos:

1. Navegue até a pasta **server** por meio do terminal e migre o contrato `CashMachine` por meio do comando:

>truffle migrate

2. Após finalizado o processo, copie o `Contract Address` resultante da migração
3. Vá até o arquivo **web3Config.mjs** e cole o endereço na constante `CONTRACT_ADDRESS`. Sem esse endereço não é possível interagir com os métodos do contrato 
4. Abra o projeto no navegador por meio do arquivo `index.html`. Se estiver utilizando o VSCode, existe uma extensão que facilita esse processo, chama-se [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Vá até a aba de extensões do seu editor por meio do atalho `ctrl + shift + x` ou `cmd + shift + x` se estiver no Mac. Digite na caixa de busca `Live Server`, clique no primeiro que aparecer e o instale. Terminada a instalação, abra o arquivo `index.html` e rode o Live Server por meio do atalho `alt + l alt + o` ou clicando com o botão direito do mouse e escolhendo a opção **Open Live Server** no menu que aparecer;
5. Rode o servidor Ganache por meio do comando:

>ganache

6. Por fim, copie um dos endereços da lista de wallets que o Ganache te oferece e logue no aplicativo. Lembrando que o Ganache deve permanecer aberto em segundo plano para que o projeto funcione corretamente.