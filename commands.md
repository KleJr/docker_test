Primeiro baixa a IMAGEM do  BANCO de DADOS
# docker build -t mysql-image -f api/db/dockerfile .
 criar uma build para o diretorio especificado o
> -t significa tag e estamos dando um nome para a imagem (mysql_image)
> -f  especifica o docker file para gerar imagem
> . é o contexto que vou usar a pasta atual (onde estou executando o comando)

LISTA AS IMAGENS instaladas no nosso pc
# docker image ls 
lista as imagens disponiveis para uso

## CRIA OS CONTAINERS PARA USAR AS IMAGENS BAIXADAS DOS REPOSITORIOS
# docker run -d -v ${pwd}/api/db/data:/var/lib/mysql --rm --name mysql-container mysql-image
> -v cria um volume baseado no diretorio para nao perder as informacoes gravadas no container
> -d para executar em background nao dependendo do terminar onde rodou o comando
> --rm se este container ja existir vai substituir se nao existir cria
> --name coloca o nome do container para achar na lista 
ultimo parametro e é imagem que vamos usar neste container

# docker ps 
lista os containers disponiveis e que estao de pé para usar

# cmd /c "docker exec -i mysql-container mysql -uroot -psenha < api/db/script.sql"
> exec é para executar comandos dentro de um container
> -i significa que estamos rodando um comando no modo interativo (shell, script, etc) o processo nao vai ser finalizado até que o processo seja concluido
> depois entra o nome do container 
> depois é o comando completo que vamos executar e em qual arquivo vamos pegar o script
(obs) - o Usuario inicia com -u e a senha -p seguidos sem espaco com as informacoes de login

# docker exec -it mysql-container /bin/bash
> -it significa q vamos usar o interative terminal 
agora temos acesso ao terminal de dentro do nosso container podemos executar qualquer comando.

# mysql -uroot -psenha
entrar no modo mysql command 

# show databases;
# show tables;
# select * from <table>;
# qualquer comando mysql 



> Outros comandos uteis
# docker stop <nomedocontainer> 

# docker inspect <nomedocontainer>

# docker start <nomedocontainer>

# docker logs <nomedocontainer>


---------------------
criar outro container com o NODEJS
1-cria um diretorio api para ser usado.
entre no diretorio para iniciar a instalacao do node.

# npm init 
inicializa o node no nosso projeto - preencher as perguntas do npm

# npm install --save-dev nodemon 
nodemon = hotreload para desenvolvimento
> -save-dev instala apenas no modo dev o nodemon

# npm install --save express  mysql
para fazer as rotas para acessar pelo navegador
mysql ja instala os drivers para acesso do mysql

# acesso o package.json para colocar o nodemon dentro de script
> "start": "nodemon ./src/index"

cria o arquivo dockerfile para criar o container do node.js 
> FROM node:10-slim
> WORKDIR /home/node/app
> CMD npm start
> -from <nome da imagem do hub docker>
> -workdir é o diretorio onde o node vai ser instalado dentro do container
> -cmd npm start é para assim que o container estiver de pé executar o server express (node.js)

# docker build -t node-image -f api/dockerfile .

# docker run -d -v ${pwd}/api:/home/node/app -p 9001:9001 --link mysql-container --rm --name node-container node-image
> --link usa o apelido do container, nao precisamos usar o IP para linkar os containers.
como é um server que tem que rodar em uma porta, especifica a porta que ele usa interno e externo 
(neste caso é a mesma porta do node express q configuramos no index.js)



caso erro de acesso auth :
> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
> flush privileges;
