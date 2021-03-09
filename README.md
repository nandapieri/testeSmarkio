# Projeto Mural de comentários

O objetivo dessa aplicação é resolver o Teste Prático de Programação proposto pelo processo seletivo da Smarkio.

## O problema

Desenvolver uma aplicação web em Node.js com banco de dados MySQL. A aplicação consistirá somente de uma página com dois painéis: no painel posicionado a esquerda, o usuário poderá cadastrar novos comentários. No painel da direita todos os comentários cadastrados devem ser listados, com um botão ao lado de cada um que ao ser clicado executará um áudio de leitura do comentário.

## O que foi realizado

Criei a aplicação que cadastra e exibe os comentários com Node js e Express se conectando a um banco de dados MySQL. A interface foi feita de acordo com o mock up apresentado, utilizando PUG e CSS. Ao clicar no botão ouvir, há um pequeno delay antes do audio ser tocado.

## Pontos de melhoria

Atualização automática da página depois de clicar no botão de cadastrar um novo comentário nem sempre funciona.

## Demonstração

https://youtu.be/t_OCiPICO4c

## Instruções

Para rodar esse projeto é necessário ter instalados o Node js e o MySQL. Guias para instalar

  Node js: https://nodejs.org/en/download/
  MySQL: https://dev.mysql.com/downloads/installer/

  Recomendo a instalação do MySQL Workbench para visualização e importação do banco de dados https://dev.mysql.com/downloads/workbench/

* Crie uma cópia deste repositório:
```
  $ git clone https://github.com/nandapieri/desafioSmarkio
```

* Navegue até a pasta do projeto via terminal e baixe as dependências do projeto:
```
  $ npm install
```

* Copie o arquivo .env.ex e crie um arquivo .env:
```
  $ cp .env.ex .env
```

* Crie uma conta gratuita no IBM Watson Text to Speech e em seguida clique em create para gerar a sua API KEY e a sua URL: https://cloud.ibm.com/catalog/services/text-to-speech

* Abra o arquivo .env e adicione as credenciais obtidas no passo anterior

* Importe o arquivo mural.sql para o seu servidor local de banco de dados e inicie o servidor MySql - importação via MySQL Workbench: https://ajuda.hostnet.com.br/importacao-do-banco-via-mysql-workbench/

* Para iniciar digite no terminal, ainda na pasta do projeto:
```
  $ npm run watch
```

* No browser acesse: http://localhost:5000/desafio

* Para parar o servidor, digite ctrl+C no terminal
