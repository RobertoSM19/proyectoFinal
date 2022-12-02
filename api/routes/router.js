const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../conexion/db');
const userMiddleware = require('../middleware/users');

const router=require('express').Router();

let clientes=require('./clientes');
router.use('/clientes',clientes);

let productos=require('./productos');
router.use('/productos',productos);

let facturas=require('./facturas');
router.use('/facturas',facturas);

let vendedores=require('./vendedores');
router.use('/vendedores',vendedores);

router.get('/',(req,res)=>{
    res.status(200).json({
        tipo:200,
        msg:'Inicia sesión o registrate'
    })
});

router.post('/sign-up', userMiddleware.validarRegistro, (req, res, next) => {
    db.query(
      `SELECT * FROM usuarios WHERE LOWER(nombre) = LOWER(${db.escape(
        req.body.nombre
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'Este nombre de usuario ya esta en uso'
          });
        } else {
          bcrypt.hash(req.body.contraseña, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              db.query(
                `INSERT INTO usuarios (id, nombre, contraseña, registrado) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.nombre
                )}, ${db.escape(hash)}, now())`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registrado',
                    nombre:req.body.nombre
                  });
                }
              );
            }
          });
        }
      }
    );
  });

router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM usuarios WHERE nombre = ${db.escape(req.body.nombre)};`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
  
        if (!result.length) {
          return res.status(401).send({
            msg: 'Nombre de usuario contraseña es incorrecto'
          });
        }
  
        bcrypt.compare(
          req.body.contraseña,
          result[0]['contraseña'],
          (bErr, bResult) => {
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'El nombre de usuario o contraseña es incorrecto'
              });
            }
  
            if (bResult) {
              const token = jwt.sign({
                  nombre: result[0].nombre,
                  id: result[0].id
                },
                'SECRETKEY', {
                  expiresIn: '7d'
                }
              );
  
              db.query(
                `UPDATE usuarios SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logiado',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Nombre de usuario contraseña es incorrecto'
            });
          }
        );
      }
    );
  });

router.get('/secret-route', userMiddleware.loggeado, (req, res, next) => {
    console.log(req.userData);
    res.send('Este es un contenido secreto, solo usuarios logiados pueden verlo');
  });

module.exports=router;