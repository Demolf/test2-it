require("dotenv").config();
require('./db/config')

const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

// Настройка EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Статика (CSS, JS)
app.use(express.static("public"));
// Парсинг JSON
app.use(express.json());
//route
app.use("/api", routes.api);
app.use("/", routes.news);

server.listen(PORT, () => {
  console.log(`Сервер запущен на сайт http://localhost:${PORT}`);
});
