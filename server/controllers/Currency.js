const express = require("express");

let router = express.Router();
let currency = require("./../helpers/models/currency");
let cors = require("cors");
router.use(cors());
const today = new Date();
const table = "monedas";

//OBTENER TODAS LAS MONEDAS REGISTRADAS
router.get("/:database", function(req, res) {
  currency.get(req.params.database, table).then(result =>{
    res.status(200).send({
      result: result
    })
  }).catch(error => res.status(400).send({
    error: error
  }));
});

//CREAR UN NUEVA MONEDA
router.post("/:database", function(req, res) {
  currency.create(req.params.database, table, req.body.monedas_des, req.body.monedas_simbolo, req.body.monedas_factor, req.body.monedas_status, today, req.body.monedas_des).then(result =>{
    res.status(200).send({
      result: result,
      message: 'Moneda Creada!'
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

//EDITAR UNA MONEDA
router.put("/:database/:monedas_id", function(req, res) {
  currency.put(req.params.database, table, req.body.monedas_des, req.body.monedas_simbolo, req.body.monedas_factor, req.body.monedas_status, req.params.monedas_id).then(result =>{
    res.status(200).send({
      result: result,
      message: 'Moneda editada!'
    })
  }).catch(error => res.status(400).send({
    error: error
  }));
});

//ELIMINAR UNA MONEDA
router.delete("/:database/:monedas_id", function(req, res) {
  currency.delete(req.params.database, table, req.params.monedas_id).then(result =>{
    res.status(400).send({
      result: result,
      message: 'Moneda Eliminada!'
    })
  }).catch(error => res.status(400).send({
    error: error
  }));
});

module.exports = router;
