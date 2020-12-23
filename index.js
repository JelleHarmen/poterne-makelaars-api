const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;

const db = new Pool({
  connectionString,
});

express()
  .use(express.static(path.join(__dirname, "public")))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .post("/asset", (req, res) => {
    const {
      title,
      asset_id,
      city,
      street,
      zip_code,
      price,
      image_header,
    } = req.body;

    db.query(
      "INSERT INTO assets (title, asset_id,city,street,zip_code,price,image_header) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [title, asset_id, city, street, zip_code, price, image_header],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.json({ success: true });
      }
    );
  })
  .get("/assets", (req, res) => {
    db.query("SELECT * FROM assets", (error, results) => {
      if (error) {
        throw error;
      }

      res.json(results.rows);
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
