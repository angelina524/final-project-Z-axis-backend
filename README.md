<h1 align="center">Welcome to Z-axis Backend👋</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://www.notion.so/didijhong/Z-axis-User-Story-3f51e7514f114ac984b34b95aaeeb8fd" target="_blank">
    <img alt="User Story" src="https://img.shields.io/badge/User Story-yes-brightgreen.svg" />
  </a>
  <a href="https://hackmd.io/LBJwuLekR_mO9pIdLfhSZQ?view" target="_blank">
    <img alt="API Documentation" src="https://img.shields.io/badge/API Documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://drawsql.app/z-axis/diagrams/z-axis-sql#" target="_blank">
    <img alt="Database structure" src="https://img.shields.io/badge/Database structure-yes-brightgreen.svg" />
  </a>
</p>

> Z-axis，為您的演說帶來無限的可能。

### 專案介紹

在虛擬的網路世界中，Z-axis 將連結您（代表 x）與觀眾（代表 y）的即時多人互動，三方串連打造更加自由、更加立體的互動空間。

Z-axis 提供即時匿名留言、按讚投票、測驗互動、抽獎活動、問卷調查…等多項豐富演說的功能，透過即時數據，分析所有活動參與者的想法，以利整場演說延伸出更多互動地可能。

前端採用 React、Socket.IO 開發，並部署在 Netlify。

後端採用 Express、Sequelize、Socket.IO 開發，部署在 AWS EC2 平台，並使用 AWS RDS - MySQL 資料庫。

### 🏠 Homepage
- [Front-End repository](https://github.com/angelina524/final-project-Z-axis-frontend/tree/dev)
- [Back-End repository](https://github.com/angelina524/final-project-Z-axis-backend/tree/dev)
- [UserStory | notion](https://www.notion.so/didijhong/Z-axis-User-Story-3f51e7514f114ac984b34b95aaeeb8fd)
- [API Documentation | HackMD](https://hackmd.io/LBJwuLekR_mO9pIdLfhSZQ)
- [Database structure | drawSQL](https://drawsql.app/z-axis/diagrams/z-axis-sql#)

### ✨ [Demo](https://zaxis.netlify.app/#/)

## Install

```sh
# npm
npm install
# yarn
yarn i

# add new file: config/config.json
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": "",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

# copy .env.example and rename .env
- SALTROUNDS(number)
- JWT_SECRET_KEY(string)
- GUEST_TOKEN_LENGTH(number)
- CRYPTO_ALGORITHM(string)
- CRYPTO_KEY(string)
- CRYPTO_IV(string)
- (seeder fake password)

# set up database table
npx sequelize-cli db:migrate 執行 Sequelize migration

# set up demo data
npx sequelize-cli db:seed:all 以執行 Sequelize seeders
```

## Usage

```sh
# npm
node run start
# yarn
yarn start
```

## Tools
- Express
- Sequelize
- bcrypt
- cors
- dotenv
- jsonwebtoken
- mysql2
- socket.io-client

## Author

👤 **Angelina** :octocat: Github: [@angelina524](https://github.com/angelina524)

👤 **BenBen** :octocat: Github: [@Benben](https://github.com/benben6515)

👤 **Didi** :octocat: Github: [@Didi](https://github.com/dadidi910)

👤 **Allen** :octocat: Github: [@Allen](https://github.com/rockyooooooo)

## File structure

```
📦 folder
 ┣ 📂config
 ┃ ┗ 📜config.json
 ┣ 📂controllers
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜guest.js
 ┃ ┣ 📜issue.js
 ┃ ┗ 📜user.js
 ┣ 📂middlewares
 ┃ ┣ 📜authority.js
 ┃ ┗ 📜error.js
 ┣ 📂migrations
 ┃ ┣ 📜20210904064206-create-user.js
 ┃ ┣ 📜20210904064230-create-issue.js
 ┃ ┣ 📜20210904064252-create-comment.js
 ┃ ┣ 📜20210904064303-create-guest.js
 ┃ ┣ 📜20210906015832-add-associations.js
 ┃ ┗ 📜20210923124728-create-guestsCommentsRelation.js
 ┣ 📂models
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜guest.js
 ┃ ┣ 📜guestsCommentsRelation.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜issue.js
 ┃ ┗ 📜user.js
 ┣ 📂routes
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜guestRouter.js
 ┃ ┣ 📜IssueRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂seeders
 ┃ ┣ 📜20210927092412-user.js
 ┃ ┣ 📜20210927114456-issue.js
 ┃ ┣ 📜20210927123833-comment.js
 ┃ ┗ 📜20210927131136-guest.js
 ┣ 📂utils
 ┃ ┗ 📜crypto.js
 ┣ 📜.env
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜example.env
 ┗ 📜index.js
```
  

> Give us a ⭐️ if you like this project!
