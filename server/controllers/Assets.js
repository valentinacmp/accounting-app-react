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
  password: props.password
});

connection.connect();

//-----------------------------------------------------------------

router.use(cors());

//Create a Asset

router.post('/create', function (req, res) {

  const today = new Date();

  var DatabaseName = req.body.db_name;
  var TableName = 'activos';

  if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
    connection.query(props.query_createAsset, [DatabaseName, TableName, req.body.activos_cod, req.body.activos_des, req.body.activos_tipos, today], function (err, result) {
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

//Delete a Asset

router.delete('/delete', function (req, res) {

  var databaseName = req.body.db_name;
  var tableName = 'activos';
  var activos_id = 'activos_id'

  connection.query(props.query_deleteAsset, [databaseName, tableName, activos_id, req.body.activos_id], function (err, result) {
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

//Update a Asset

router.put('/update', function (req, res) {

  var DatabaseName = req.body.db_name;
  var TableName = 'activos';

  if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
    connection.query(props.query_updateAsset, [DatabaseName, TableName, req.body.activos_cod, req.body.activos_des, req.body.activos_tipos, req.body.activos_id ], function (err, result) {
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

//Get all Assets

router.get('/', function (req, res) {

  var DatabaseName = req.body.db_name;
  var TableName = 'activos';

  connection.query(props.query_Asset, [DatabaseName, TableName], function (err, result) {
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
