const express = require("express");
const router = express.Router();
const news = require('./news')

router.use("/news", news)

module.exports = router;
