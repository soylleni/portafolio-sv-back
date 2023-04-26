var express = require('express');
var router = express.Router();
const mysql = require('mysql')
express().use(express.json());

const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'reqs_db'
})

/* GET home page. */
router.get('/reqsAdmin', (req, res) => {
    const { nombre, correo, tipoSolicitud,comentario, estado } = req.body;
    const values = [nombre, correo, tipoSolicitud,comentario, estado];
    const sql = 'SELECT * FROM reqs_db';
  

    conectBD.query(sql, values,(err,result) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(400).send('No hay solicitudes registradas.')
            }
        }
    })
});

router.post('/crear-req', (req, res) => {
    const sql = 'INSERT INTO reqs_db SET ?';
    const {  nombre, correo, tipoSolicitud,comentario, estado } = req.body;
    const reqsObj = {
      nombre: req.body.nombre,
      correo: req.body.correo,
      tipoSolicitud: req.body.tipoSolicitud,
      comentario: req.body.comentario,
      estado: 'Activo'
    };
    conectBD.query(sql, reqsObj, (error)  => {
      if (error) throw error;
      res.send('La solicitud fue creada con éxito');
    });
  });

  router.put('/actualizar-req/:reqId', async (req, res) =>{
    console.log('req.params', req.params);
    const id = req.params.reqId;
    const {  nombre, correo, tipoSolicitud,comentario, estado } = req.body;
    const sql = `UPDATE reqs_db SET nombre='${nombre}', correo='${correo}', tipoSolicitud='${tipoSolicitud}',comentario='${comentario}', estado='${estado}' WHERE idreqs_db = ${id}`;
    await conectBD.query(sql, error => {
      if (error) throw error;
      res.send(`Solicitud con el id: ${id}, fue procesada con éxito.`);
    });
  });


  
router.put('/borrar-req/:reqId', async (req, res) => {
    console.log('req.params', req.params);
    const id = req.params.reqId;
    const sql = `DELETE FROM reqs_db WHERE idreqs_db = ${id}`;
    await conectBD.query(sql, error => {
      if (error) throw error;
      res.send(`Usuario con el id: ${id}, fue eliminado con éxito.`);
    });
  });
  

module.exports = router;