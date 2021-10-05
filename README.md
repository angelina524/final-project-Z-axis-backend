# Z-axis 為您的演說帶來無限的可能
## 專案目標
以實際的作品運用現代框架與工具，呈現計畫中所學的成果。

## 專案介紹
在虛擬的網路世界中，Z-axis 將連結您（代表 x）與觀眾（代表 y）的即時多人互動，三方串連打造更加自由、更加立體的互動空間。

Z-axis 提供即時匿名留言、按讚投票、測驗互動、抽獎活動、問卷調查…等多項豐富演說的功能，透過即時數據，分析所有活動參與者的想法，以利整場演說延伸出更多互動地可能。

後端採用 Express、Sequelize、Socket.IO 開發，部署在 AWS 平台並使用 heroku clearDB。

## 建置
1. 執行 `npm install` 安裝此專案所需的第三方套件
2. 新增 `config/config.json`，格式為：

```
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
```

3. 請複製.env.example並改名成.env，並且設置裡面的環境變數
  - SALTROUNDS(number)
  - JWT_SECRET_KEY(string)
  - GUEST_TOKEN_LENGTH(number)
  - CRYPTO_ALGORITHM(string)
  - CRYPTO_KEY(string)
  - CRYPTO_IV(string)
4. 輸入指令 `npx sequelize-cli db:migrate 執行 Sequelize migration`，在 MySQL 資料庫中建立 table
5. 輸入指令 `npx sequelize-cli db:seed:all 以執行 Sequelize seeders` 以在資料庫中建立初始 demo 資料

## 開發
1. `npm run start`

## 第三方套件
1. bcrypt：將密碼加密後存入資料庫，避免明碼密碼。
2. cors：解決跨來源資源共用。
3. dotenv：設置環境變數。
4. express：使用 Node.js Web 架構。
6. jsonwebtoken：使用 JWT 來實作登入機制驗證。
7. mysql2：使用 mysql2 連線資料庫。
8. sequelize：使用 ORM 框架 Sequelize 來操作資料庫。

## API 文件
1. [API 文件](https://hackmd.io/LBJwuLekR_mO9pIdLfhSZQ)
2. [資料庫結構](https://drawsql.app/z-axis/diagrams/z-axis-sql#)
