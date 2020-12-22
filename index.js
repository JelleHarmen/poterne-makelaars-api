const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;

const db = new Pool({
  connectionString,
})

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.json({'hello': 'world'}))
  .post('/post', (req, res) => {
    const { name, body } = req.body;

    db.query('INSERT INTO blog (name, body) VALUES ($1, $2)', [
      name,
      body
    ], (error, results) => {
      if (error) {
        throw error
      }

      res.json({'success': true})
    })
  })
  .get('/posts', (req, res) => {
    db.query('SELECT * FROM blog', (error, results) => {
      if (error) {
        throw error
      }

      res.json(results.rows)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))