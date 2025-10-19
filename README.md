

##  Instalação

Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior)
- **MySQL**
- **pnpm** 


- **Acessar o repositório no GitHub**
   [https://github.com/diogonoguiera27](https://github.com/diogonoguiera27)


- **Clonar o repositório**  
   git clone https://github.com/diogonoguiera27/teste-tecnico-manto-sistemas.git

- **Entrar na pasta do projeto**
  cd teste-tecnico-manto-sistemas

- **Instalar as dependências**
   pnpm install

- **Criar o arquivo .env na raiz do projeto**
    DATABASE_URL="mysql://root:@localhost:3306/teste_tecnico"
    JWT_SECRET="superSecretKey$123@Manto"
    INVERTEXTO_API_KEY="22355|ibWdovcyV5vbNzeXPT2ObFeaARyLzND3" 

- **O projeto utiliza o MySQL com o Prisma ORM para gerenciar o banco de dados.O script SQL com a estrutura das tabelas está incluído em:**

    /prisma/database_script.sql

- **Se o banco for criado manualmente, basta rodar:**

  pnpm install
   pnpm run dev

- **Caso o banco não tenha sido criado manualmente, rode os comandos abaixo para gerar as tabelas automaticamente:**

  npx prisma migrate dev
  npx prisma generate


## Execução

- **Para rodar o servidor basta rodar esse comando**
      pnpm run dev

- **Servidor Sera em**
     http://localhost:3333
     

## Testar os endpoints

Importe o arquivo abaixo no Insomnia
  /docs/Insomnia_Collection.json


###  Autenticação com Token JWT

Algumas rotas exigem autenticação com **Bearer Token (JWT)**.  
Depois de fazer login na rota `/auth/login`, será retornado um token.  

Esse token deve ser colocado no **Insomnia** da seguinte forma:

#### Opção 1: Aba Auth
 Vá até a aba Auth.  
 Selecione o tipo Bearer Token.  
 Cole o token retornado no campo Token.

####  Opção 2: Aba Headers
- Vá até a aba Headers.  
- Adicione uma nova linha com os seguintes campos:
  - Key / Header: `Authorization`
  - Value: `Bearer <seu_token>`
