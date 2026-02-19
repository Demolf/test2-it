const db = require("./config");

function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

const m = {};

m.gets = async () => {
  try {
    const sql =
      "SELECT id, content, name, created_at FROM news ORDER BY created_at ASC";
    const results = await queryAsync(sql);
    return { is: true, get: results };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

m.insert = async (arr) => {
  try {
    const sql = "INSERT INTO news (content, name) VALUES (?, ?)";
    const result = await queryAsync(sql, arr);
    return { is: true, get: result };
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return { is: false, get: err };
  }
};

module.exports = m;
