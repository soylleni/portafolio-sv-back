var express = require('express');
var router = express.Router();

const mysql = require('mysql');

// Crear una instancia de conexión a la base de datos
const conectBD = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'portafolio'
});

// Middleware para analizar el cuerpo de las solicitudes como JSON
express().use(express.json());

// Definir una ruta POST para el inicio de sesión
router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  const values = [userName, password];

  const sql = 'SELECT * FROM login WHERE userName = ? AND password = ?';
  conectBD.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result.length > 0) {
        res.status(200).send('usuario existe');
      } else {
        res.status(400).send('Usuario no existe!');
      }
    }
  });
});

module.exports = router;
