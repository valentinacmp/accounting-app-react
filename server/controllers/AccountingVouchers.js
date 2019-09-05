const express = require('express');
const props = require('./../helpers/props/properties');
let router = express.Router();
let cors = require('cors');

//---------------------------------------------------------------------------

//Mysql Connection 

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: props.host,
  user: props.user,
  password: props.password,
});

connection.connect();

//-----------------------------------------------------------------

router.use(cors());


//Create a Voucher

router.post('/create', function (req, res) {

  const today = new Date();

  var DatabaseName = req.body.db_name;
  var TableName = 'comprobantes';

  if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
    connection.query(props.query_createVoucher, [DatabaseName, TableName, req.body.comprobantes_des, req.body.comprobantes_tipo, req.body.comprobantes_numero, req.body.comprobantes_fecha, today], function (err, result) {
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

//Delete a Voucher

router.delete('/delete', function (req, res) {

  var databaseName = req.body.db_name;
  var tableName = 'comprobantes';
  var comprobantes_id = 'comprobantes_id'

  connection.query(props.query_deleteVoucher, [databaseName, tableName, comprobantes_id, req.body.comprobantes_id], function (err, result) {
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

//Update a Voucher

router.put('/update', function (req, res) {

  var DatabaseName = req.body.db_name;
  var TableName = 'comprobantes';

  if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
    connection.query(props.query_updateVoucher, [DatabaseName, TableName, req.body.comprobantes_des, req.body.comprobantes_tipo, req.body.comprobantes_numero, req.body.comprobantes_fecha, req.body.comprobantes_id], function (err, result) {
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

//Get all Vouchers

router.get('/', function (req, res) {

  var DatabaseName = req.body.db_name;
  var TableName = 'comprobantes';

  connection.query(props.query_Voucher, [DatabaseName, TableName], function (err, result) {
    if (!err) {
      res.status(200).json({
        result: result
      });
      console.log(result)
    } else {
      res.status(400).json(err);
    }
  });

});

module.exports = router;
