const mysql = require("mysql2");

// Подключение к MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: "chat_db", // Убрано, чтобы подключиться к MySQL без выбора базы
});

// Проверка подключения к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Подключено к MySQL");
});

// Сначала создаём базу данных, если её нет
const createDbQuery = "CREATE DATABASE IF NOT EXISTS test";
db.query(createDbQuery, (err, result) => {
  if (err) {
    console.error("Ошибка при создании базы данных test:", err);
    return;
  }
  console.log("База данных test готова к использованию");

  // Теперь подключаемся к базе данных test
  db.changeUser({ database: "test" }, (err) => {
    if (err) {
      console.error("Ошибка при подключении к базе данных test:", err);
      return;
    }

    // Создаём таблицу, если её нет
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error("Ошибка при создании таблицы news:", err);
      } else {
        console.log("Таблица news готова к использованию");
      }
    });
  });
});

module.exports = db;
