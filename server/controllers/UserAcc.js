const express = require("express");

let props = require("./../helpers/props/properties");
let router = express.Router();
let user = require("./../helpers/models/userAcc");

let cors = require("cors");
router.use(cors());
const table = "usuarios";
const today = new Date();

//OBETENER USUARIOS POR BASE DE DATOS
router.get("/:database", function(req, res) {
  user.getUserAcc(req.params.database, table).then(result => {
    res.status(200).send({
      result: result
    });
  }).catch(error => {
    res.status(400).send({
      error: error
    });
  });
});

//OBTENER ID DEL USUARIO CREADOR
router.get("/creator/:user_id", function(req, res) {
  user.getUserid(req.params.user_id).then(result =>{
    res.status(200).send({
      result: result
    })
  }).catch(error =>{
    res.status(400).send({
      error: error
    })
  });
});

//OBTENER PERMISOS POR USER ID
router.get("/permissions/:database", function(req, res) {
  user.getPermissions(req.params.database).then(result=>{
    res.status(200).send({
      result: result
    })
  }).catch(error =>{
    res.status(400).send(error)
  })
});

//CREAR USUARIO EN WEB USUARIO
router.post("/create/", function(req, res) {
  // const today = new Date();
  // const resultado = "";

  const user_data = {
    perfilWeb: "Usuario Contable",
    typeWeb: 3,
    perfil: 0,
    consecutive: "01",
    serial: -23,
    grupo: 01
  };

  user.createAccUser(req.body.usuario_nombre, req.body.usuario_clave,
    user_data.perfilWeb,
    today,
    user_data.typeWeb,
    user_data.perfil,
     user_data.consecutive,
      user_data.serial
    )
    .then(result => {
      console.log("User id ->", result.insertId);

      //CREATE PERFIL TYPE: 3
      user
        .createUserProfileAcc(req.body.creador_id, result.insertId)
        .then(results => {
          console.log("User Profile id ->", results.insertId);

          res.status(200).send({
            result: results
          });

          //CREAR RESTRICCIONES
          user
            .createUserRestrictions(result.insertId, results.insertId)
            .then(res => {
              res.status(200).send({
                result: res,
                message: "Usuario creado con exito"
              });
            })
            .catch(error => {
              res.status(400).send(error);
            });
        })
        .catch(error => {
          res.status(400).send(error);
        });
    })
    .catch(error => {
      res.status(400).send({
        error: error,
        message: "Error!"
      });
    });
});

//CREAR USUARIO EN EMPRESA_N DB

router.post("/create/:database", function(req, res) {

  const user_data = {
    grupo: 01
  };

  user.create(req.params.database, table, req.body.usuario_nombre, req.body.usuario_des, req.body.usuario_clave, today,req.body.usuario_expiration_date, req.body.usuario_status, req.body.usuario_ubicacion, req.body.usuario_email,user_data.grupo, req.body.usuario_acceso_empresa, req.body.usuarios_accesos).then(result => {
    res.status(200).json({
      result: result
    });
    console.log(result);
  }).catch(error => {
    if (error === null) {
      res.status(300).json({
        error: error,
        message: "Ya existe"
      });
    } else {
      res.status(400).json(error);
    }
  });
});

//ELIMINAR USUARIO

router.delete("/:database/:usuario_nombre", function(req, res) {
  user.delete(req.params.database, table, req.params.usuario_nombre).then(result => {
    res.status(200).send({
      result: result,
      message: 'Usuario Eliminado!'
    })
  }).catch(error => {
    res.status(400).send({
      error: error
    })
  })
});

//ElIMINAR TODOS LOS USUARIOS -> SE USA AL MOMENTO DE ELIMINAR LA EMPRESA

router.delete("/:database", function (req, res) {
  user.deleteAllUsers(req.params.database, table, req.params.database).then(result =>{
    res.status(200).send({
      result: result,
      message: 'Usuarios Eliminados'
    })
  }).catch(error => { res.status(400).send(error) });
});

//ELIMINAR USUARIO EN WEBUSUARIO

router.delete("/:usuario_nombre", function (req, res) {
  user.deleteUser(req.params.usuario_nombre).then(result =>{
    res.status(200).send({
      result: result,
      message: 'Usuario Eliminado'
    })
  }).catch(error => res.status(400).send(error));
});

//EDITAR USUARIO

router.put("/:database/:user_id", function(req, res) {
  user
    .update(
      req.params.database,
      table,
      req.body.usuario_nombre,
      req.body.usuario_des,
      req.body.usuario_clave,
      req.body.usuario_expiration_date,
      req.body.usuario_status,
      req.body.usuario_ubicacion,
      req.body.usuario_email,
      req.body.usuario_acceso_empresa,
      req.body.usuarios_accesos,
      req.params.user_id
    )
    .then(result => {
      res.status(200).send({
        result: result,
        message: "Usuario Editado!"
      });
    })
    .catch(error => {
      res.status(400).send({
        error: error
      });
    });
});

module.exports = router;
