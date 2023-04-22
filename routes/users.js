var express = require('express');
var router = express.Router();
const app = express();
var cors = require('cors');

app.use(cors());

const mysql = require('mysql')

express().use(express.json())

const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portafolio'
})

conectBD.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database with thread ID ' + conectBD.threadId);
});



router.post('/', (req, res) => {
  const {userName, password} = req.body

  const values = [userName, password]

  const sql = 'SELECT * FROM login where userName = ? and password = ?'
  conectBD.query(sql, values,(err, result) => {
    if (err) {
      res.status(500).send(err)
      console.log("se envio user")
    } else {
      if (result.length > 0) {
        res.status(200).send(
          'usuario existe'
        )
      } else {
        res.status(400).send('Usuario no existe !')
      }
    }
  })
});

module.exports = router;