const express = require("express");

let props = require("./../helpers/props/properties");
let router = express.Router();
let costCenter = require("./../helpers/models/costCenters.js");

let cors = require("cors");
router.use(cors());


//Get all Cost Centers

router.get('/:database', function (req, res) {

  const table = "centros_de_costos";

  costCenter.get(req.params.database, table).then(result => {
    res.status(200).json({
      result: result
    });
  }).catch(error => {
    res.status(400).json(error);
  });
});

//Create a Cost Center

router.post('/create/:database', function (req, res) {

  const today = new Date();
  const table = "centros_de_costos";
  const replace = '*';

  costCenter.create(req.params.database, table,req.body.centros_de_costos_cod, req.body.empresa_separador_cc, replace, req.body.centros_de_costos_des, req.body.centros_de_costos_status, today).then(result => {
    res.status(200).json({
      result: result
    });
  }).catch(error => {
    if(error === null){
      res.status(300).json({
        error: error,
        message: 'Ya existe'
      });
    } else {
      res.status(400).json(error);
      // console.log('here')
    }
  })
});

//Delete Cost Center

router.delete('/delete/:database', function (req, res) {

});

//Delete a Cost Center

router.delete("/delete/:database/:centros_de_costos_cod", function(
  req,
  res
) {

});

//Update a Cost Center

router.put("/update/:database/:centros_de_costos_cod", function(req, res) {

});

module.exports = router;
