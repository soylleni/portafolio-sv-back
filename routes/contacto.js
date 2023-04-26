var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const Joi = require('joi')
const { validationResult } = require('express-validator')


const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portafolio'
})

/* GET home page. */
router.get('/contacto', (req, res) => {
    const {user, password} = req.body
    const values = [user, password]
    const sql = 'select * from reqs_db'

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


router.put('/reqsAdmin/:providerId', async(req,res) =>{
    console.log('req.params',req.params)
    const id = req.params.providerId

    const {nombre,usuario,rol} = req.body

    const sql = `UPDATE providers SET nombre = '${nombre}', usuario = '${usuario}', rol = '${rol}'
        where idproviders = ${id}
    `
    await conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Usuario con el id: ${id}, fue actualizado con exito.`)
    })
})



module.exports = router;