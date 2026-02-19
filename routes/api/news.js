// routes/chat.js
const express = require("express");
const router = express.Router();

const { news } = require("./../../db/index");

// GET /api/news — получить
router.get("/", async (req, res) => {
  res.json(await news.gets());
});

// POST /api/news — отправить
router.post("/", async (req, res) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: "Имя и сообщение обязательны" });
  }

  const message = {
    id: Date.now(),
    name: name.trim(),
    content: content.trim(),
    time: new Date().toISOString(),
  };

  const info = await news.insert([content.trim(), name.trim()]);

  res.status(201).json({info, message});
});

module.exports = router;
