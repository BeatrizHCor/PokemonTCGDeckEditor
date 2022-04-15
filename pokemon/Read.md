Essa Aplicação usa GraphQl v15, Apollo Server v3, Postgres v8 e Node v17.
É necessário Docker e Docker-Compose para ultilização.

Para instalação de todos os pacotes necessários rode o comando "yarn".
Os pacotes necessários para a aplicação incluem bcrypt e jsonwebtoken.


Para rodar a aplicação primeiro é necessário o comando "yarn dbup" para geração do Container no Docker.
O comando "yarn dev" é ultilizado para iniciar o servidor. IMPORTANTE: Inicializar o servidor antes de inicializar a aplicação para evitar conflitos.
O servidor irá rodar na URL localhst:4000
