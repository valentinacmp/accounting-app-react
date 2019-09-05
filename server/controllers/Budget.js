const express = require("express");

let router = express.Router();
let budget = require("../helpers/models/budget");
let cors = require("cors");
router.use(cors());
const today = new Date();
const table = "partidas_presupuestarias";

//OBTENER TODAS LAS PARTIDAS REGISTRADAS
router.get("/:database", function(req, res) {
  budget
    .get(req.params.database, table)
    .then(result => {
      res.status(200).send({
        result: result
      });
    })
    .catch(error =>
      res.status(400).send({
        error: error
      })
    );
});

//OBTENER LAS PARTIDAS (CENTROS DE COSTOS) 
router.get("/:database/:table", function(req,res) {
  budget.get(
    req.params.database,
    req.params.table
  ).then(result =>{
    res.status(200).send({
      result: result
    })
  }).catch(error =>{
    res.status(400).send({
      error: error
    })
  })
});

//OBTENER LAS PARTIDAS (CENTROS DE COSTOS) by id
router.get("/:database/:table/:partidas_presupuestarias_id", function(req,res) {
  budget.getCC(
    req.params.database,
    req.params.table,
    req.params.partidas_presupuestarias_id
  ).then(result =>{
    res.status(200).send({
      result: result
    })
  }).catch(error =>{
    res.status(400).send({
      error: error
    })
  })
});

//CREAR UN NUEVA PARTIDA
router.post("/:database", function(req, res) {
  budget
    .create(
      req.params.database,
      table,
      req.body.partidas_presupuestarias_cod,
      req.body.partidas_presupuestarias_des,
      req.body.partidas_presupuestarias_espec,
      req.body.partidas_presupuestarias_responsable,
      req.body.partidas_presupuestarias_partida,
      req.body.partidas_presupuestarias_cc,
      req.body.partidas_presupuestarias_cuentas,
      req.body.partidas_presupuestarias_mod,
      req.body.partidas_presupuestarias_total,
      req.body.partidas_presupuestarias_fecha_inicio,
      req.body.partidas_presupuestarias_fecha_fin,
      req.body.partidas_presupuestarias_status,
      today
    )
    .then(result => {
      res.status(200).send({
        result: result,
        message: "Partida Presupuestaria Creada!"
      });
    })
    .catch(error => {
      if (error === null) {
        res.status(400).send({
          message: "Ya existe"
        });
      } else {
        res.status(400).send({
          error: error
        });
      }
    });
});


//CREAR PARTIDA (CENTROS DE COSTOS)
router.post("/:database/:table/", (req, res) => {
  budget.createCC(
    req.params.database,
    req.params.table,
    req.body.partidas_presupuestarias_id,
    req.body.partidas_presupuestarias_cc_partida,
    req.body.partidas_presupuestarias_cc_total,
    req.body.partidas_presupuestarias_cc_codigo,
    req.body.partidas_presupuestarias_cc_des,
    req.body.partidas_presupuestarias_cc_pres,
    req.body.partidas_presupuestarias_cc_asig,
    req.body.partidas_presupuestarias_cc_dif,
    today
  ).then(result => {
    res.status(200).send({
      result: result,
      message: "Creada!"
    })
  }).catch(error => {
    res.status(400).send({
      error: error
    });
  })
});

//EDITAR PARTIDA
router.put("/:database/:partidas_presupuestarias_id", function(req, res) {
  budget
    .put(
      req.params.database,
      table,
      req.body.partidas_presupuestarias_cod,
      req.body.partidas_presupuestarias_des,
      req.body.partidas_presupuestarias_espec,
      req.body.partidas_presupuestarias_responsable,
      req.body.partidas_presupuestarias_partida,
      req.body.partidas_presupuestarias_cc,
      req.body.partidas_presupuestarias_cuentas,
      req.body.partidas_presupuestarias_mod,
      req.body.partidas_presupuestarias_total,
      req.body.partidas_presupuestarias_fecha_inicio,
      req.body.partidas_presupuestarias_fecha_fin,
      req.body.partidas_presupuestarias_status,
      req.params.partidas_presupuestarias_id
    )
    .then(result => {
      res.status(200).send({
        result: result,
        message: "Partida Presupuestaria editada!"
      });
    })
    .catch(error =>
      res.status(400).send({
        error: error
      })
    );
});

//ELIMINAR UNA PARTIDA
router.delete("/:database/:partidas_presupuestarias_id", function(req, res) {
  budget
    .delete(req.params.database, table, partidas_presupuestarias_id)
    .then(result => {
      res.status(400).send({
        result: result,
        message: "Partida Presupuestaria Eliminada!"
      });
    })
    .catch(error =>
      res.status(400).send({
        error: error
      })
    );
});

module.exports = router;
