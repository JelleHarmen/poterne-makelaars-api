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
  .get("/", (req, res) =>
    res.json(
      {
        id: 623475,
        house: true,
        ownership: true,
        name: "huis",
        title: "Koopwoning in gorinchem",
        city: "Gorinchem",
        street: "Koningin Wilhelminalaan 134",
        zip_code: "4207 ER",
        price: 780000,
        image_header: require("../assets/properties/huis.jpg"),
      },
      {
        id: 752346,
        house: true,
        ownership: false,
        name: "appartement",
        title: "Huurwoning in gorinchem",
        city: "Gorinchem",
        street: "Glacis 6a",
        zip_code: "4207 EB",
        price: 1600,
        image_header: require("../assets/properties/appartement.jpg"),
      },
      {
        id: 643674,
        house: false,
        ownership: true,
        name: "parkeergelegenheid",
        title: "Koop garagebox in Gorinchem",
        city: "Gorinchem",
        street: "Hoofdwal 33",
        zip_code: "4207 EX",
        price: 80000,
        image_header: require("../assets/properties/garagebox.jpg"),
      },
      {
        id: 946473,
        house: false,
        ownership: false,
        name: "parkeergelegenheid",
        title: "huur garagebox in Gorinchem",
        city: "Gorinchem",
        street: "Vestingweg 36",
        zip_code: "4207 EE",
        price: 120,
        image_header: require("../assets/properties/garagebox-rood.jpg"),
      },
      {
        id: 254739,
        house: true,
        ownership: true,
        name: "huis",
        title: "Koopwoning in gorinchem",
        street: "Lingsesdijk 1",
        zip_code: "4207 EA",
        city: "Gorinchem",
        price: 780000,
        image_header: require("../assets/properties/huis.jpg"),
      },
      {
        id: 847365,
        house: true,
        ownership: false,
        name: "appartements",
        title: "Huurwoning in gorinchem",
        city: "Gorinchem",
        street: "Merwededijk 88",
        zip_code: "4207 EN",
        price: 1600,
        image_header: require("../assets/properties/appartement.jpg"),
      },
      {
        id: 263947,
        house: false,
        ownership: true,
        name: "parkeergelegenheid",
        title: "Koop garagebox in Gorinchem",
        city: "Gorinchem",
        street: "Woelsedonk 90",
        zip_code: "4207 EH",
        price: 80000,
        image_header: require("../assets/properties/garagebox.jpg"),
      },
      {
        id: 940583,
        house: false,
        ownership: false,
        name: "parkeergelegenheid",
        title: "huur garagebox in Gorinchem",
        city: "Gorinchem",
        street: "Elisabeth Kuyperstraat 2",
        zip_code: "4207 EJ",
        price: 120,
        image_header: require("../assets/properties/garagebox-rood.jpg"),
      }
    )
  )
  .post("/post", (req, res) => {
    const { name, body } = req.body;

    db.query(
      "INSERT INTO blog (name, body) VALUES ($1, $2)",
      [name, body],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.json({ success: true });
      }
    );
  })
  .get("/posts", (req, res) => {
    db.query("SELECT * FROM blog", (error, results) => {
      if (error) {
        throw error;
      }

      res.json(results.rows);
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
