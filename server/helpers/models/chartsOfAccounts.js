const props = require('../props/properties.js');
const connection = require('../config/database.js');

var Promise = require('promise');

module.exports = {

  databases: function (req, res) {

    var noTaken = 'no_taken';

    connection.query(props.databases, [noTaken], function (err, company) {
      if (!err) {
        res.status(200).json({
          databases: company
        });
        console.log(company)
      } else {
        res.status(400).json(err);
      }
    });

  },

  getChart: function (database, table) {
    return new Promise((res, rej) =>{
      connection.query(props.query_get, [database, table], function (error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
        }
      });
    })
  },

  create: function (database, table, plan_de_cuentas_cod, indicator, replace, plan_de_cuentas_des, plan_de_cuentas_actv, plan_de_cuentas_created_at) {
    return new Promise((res, rej) => {
      connection.query(props.query_checkCA, [database, table, plan_de_cuentas_cod], function (error, result) {

        console.log(result);

        if (result.length === 0) {
          connection.query(props.query_createCA, [database, table, plan_de_cuentas_cod, indicator, replace, plan_de_cuentas_des, plan_de_cuentas_actv, plan_de_cuentas_created_at], function (error, result) {
            if (!error) {
              res(result)
              console.log(result);
            } else {
              rej(error)
              console.log(error);
            }
          });
        } else {
          rej(error);
          console.log('Plan de cuenta ya existe!', error);
        }
      });
    })
  }

}