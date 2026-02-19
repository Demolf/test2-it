// routes/chat.js
const express = require("express");
const router = express.Router();

const { news } = require("./../db/index");

router.get("/", async (req, res) => {
  // console.log(news.insert(['textarea', 'name']))
  const get = await news.gets();
  res.render("index", {
    title: "test",
    name: "Аноним",
    data: get,
  });
});

module.exports = router;
