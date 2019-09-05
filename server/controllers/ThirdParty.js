const express = require("express");

let router = express.Router();
let third_party = require("../helpers/models/thirdParties");
let cors = require("cors");
router.use(cors());
const today = new Date();
const table = "partidas_presupuestarias";

//OBTENER TODAS LAS PARTIDAS REGISTRADAS
router.get("/:database", function(req, res) {
  third_party.get(req.params.database, table).then(result =>{
    res.status(200).send({
      result: result
    })
  }).catch(error => res.status(400).send({
    error: error
  }));
});

//CREAR UN NUEVA PARTIDA
router.post("/:database", function(req, res) {
  third_party.create(req.params.database).then(result =>{
    res.status(200).send({
      result: result,
      message: 'Partida Presupuestaria Creada!'
    })
  }).catch(error => {
    if(error === null){
      res.status(400).send({
        message: 'Ya existe'
      });
    } else {
      res.status(400).send({
        error: error
      });
    }
  });
});

//EDITAR PARTIDA
router.put("/:database", function(req, res) {
  third_party.put(req.params.database).then(result =>{
    res.status(200).send({
      result: result,
      message: "Partida Presupuestaria editada!"
    });
  }).catch(error => res.status(400).send({
    error: error
  }));
});

//ELIMINAR UNA PARTIDA 
router.delete("/:database", function(req, res) {
  third_party.delete(req.params.database).then(result =>{
    res.status(400).send({
      result: result,
      message: "Partida Presupuestaria Eliminada!"
    });
  }).catch(error => res.status(400).send({
    error: error
  }));
});

module.exports = router;

