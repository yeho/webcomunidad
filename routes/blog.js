const express = require("express");
router = express.Router();
const mariadb = require("mariadb");

const db_past = process.env.password;

const pool = mariadb.createPool({
  host: "localhost",
  user: "Itscience",
  password: db_past,
  database: "itscience",
});

router.get("/", async function (req, res, next) {
  let conn = await pool.getConnection();
  const info = await conn.query("SELECT * FROM posts");

  if (info.length == 0) {
    return res.render("blog", { posts: false });
  }

  return res.render("blog", { posts: info });
});

module.exports = router;
