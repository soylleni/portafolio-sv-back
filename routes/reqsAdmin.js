var express = require('express');
var router = express.Router();
const mysql = require('mysql')


const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'reqs_db'
})

/* GET home page. */
router.get('/', (req, res) => {
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
    const sql = 'INSERT INTO reqs_db SET ?'

    const reqsObj = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        tipoSolicitud: req.body.tipoSolicitud,
        comentario: req.body.comentario,
        estado: 'Activo'
    }

    conectBD.query(sql, reqsObj, error  => {
        if (error) throw error

        res.send('La solicitud fue creada con exito')
    })
});

router.put('/actualizar-req/:reqId', async(req,res) =>{
    console.log('req.params',req.params)
    const id = req.params.idreqs_db

    const {nombre,usuario,rol} = req.body

    const sql = `UPDATE providers SET estado = 'Inactivo'
        where idreqs_db = ${id}
    `
    await conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Usuario con el id: ${id}, fue procesado con exito.`)
    })
})

router.put('/borrar-req/:reqId', async(req,res) =>{
    console.log('req.params',req.params)
    const id = req.params.idreqs_db

    const sql = `DELETE from providers  where idreqs_db = ${id}
    `
    await conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Usuario con el id: ${id}, fue eliminado con exito.`)
    })
})

module.exports = router;