var express = require('express');
var router = express.Router();
const mysql = require('mysql')


const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'reqs'
})

/* GET home page. */
router.get('/', (req, res) => {
    const {user, password} = req.body
    const values = [user, password]
    const sql = 'select * from providers'

    conectBD.query(sql, values,(err,result) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(400).send('No hay proveedores registrados.')
            }
        }
    })
});

router.post('/crear-req', (req, res) => {
    const sql = 'INSERT INTO providers SET ?'

    const providerObj = {
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        rol: req.body.rol
    }

    conectBD.query(sql, providerObj, error  => {
        if (error) throw error

        res.send('La solicitud fue creada con exito')
    })
});

router.put('/actualizar-req/:reqId', async(req,res) =>{
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

router.put('/borrar-req/:reqId', async(req,res) =>{
    console.log('req.params',req.params)
    const id = req.params.providerId

    const sql = `DELETE from providers  where idproviders = ${id}
    `
    await conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Usuario con el id: ${id}, fue eliminado con exito.`)
    })
})

module.exports = router;