const express = require('express');

let props = require('./../helpers/props/properties');
let config = require('./../helpers/config/config');
let router = express.Router();
let chartOA = require('./../helpers/models/chartsOfAccounts.js');

let cors = require('cors');
router.use(cors());

//Get Chart of Accounts

router.get('/:database', function (req, res) {
  var table = 'plan_de_cuentas';

  chartOA.getChart(req.params.database, table).then(result =>{
    res.status(200).json({
      result: result
    });
  }).catch(error =>{
    res.status(400).json(error);
  });
});

//Create a Chart Account

router.post('/create/:database', function (req, res) {

  const today = new Date();
  const table = 'plan_de_cuentas';
  const replace = '*';

  chartOA.create(req.params.database, table, req.body.plan_de_cuentas_cod, req.body.empresa_separador_pc, replace
    ,req.body.plan_de_cuentas_des, req.body.plan_de_cuentas_actv, today).then(result => {
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
    }
  })
});

//Delete a Chart Account

router.delete('/delete', function (req, res) {

  var databaseName = req.body.db_name;
  var tableName = 'plan_de_cuentas';
  var plan_de_cuentas_id = 'plan_de_cuentas_id'

  connection.query(props.query_deleteCA, [databaseName, tableName, plan_de_cuentas_id, req.body.plan_de_cuentas_id], function (err, result) {
    if (!err) {
      res.status(200).json({
        result: result
      });
      console.log(result);
    } else {
      res.status(400).json(err);
      console.log(err)
    }
  });

});

//Update a Chart Account

router.put('/update', function (req, res) {

  var DatabaseName = req.body.db_name;
  var TableName = 'plan_de_cuentas';

  if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
    connection.query(props.query_updateCA, [DatabaseName, TableName, req.body.plan_de_cuentas_cod, req.body.plan_de_cuentas_des, req.body.plan_de_cuentas_actv, req.body.plan_de_cuentas_id], function (err, result) {
      if (!err) {
        res.status(200).json({
          result: result
        });
        console.log(result);
      } else {
        res.status(400).json(err);
        console.log(err);
      }
    });
  }

});


module.exports = router;
