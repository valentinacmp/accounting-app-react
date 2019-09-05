const props = require("../props/properties.js");
const connection = require("../config/database.js");
const Promise = require("promise");

module.exports = {
  
  get: function (database, table) {
    return new Promise((res, rej) =>{
      connection.query(props.query_get, [database, table], function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      })
    })
  },

  create: function (database, table, monedas_des, monedas_simbolo, monedas_factor, monedas_status, monedas_created_at, monedas_des) {
    return new Promise((res, rej) =>{
      connection.query(props.query_checkCurrency, [database, table, monedas_des], function (error, result) {
        if(result.length === 0){
          connection.query(props.query_createCurrency, [database, table, monedas_des, monedas_simbolo, monedas_factor, monedas_status, monedas_created_at], function (error, result) {
            if(!error){
              res(result);
              console.log(result);
            } else {
              rej(error);
              console.log(error);
            }
          })
        } else{
          rej(error);
          console.log('Error: Ya existe');
        }
      });
    })
  },

  put: function (database, table, monedas_des, monedas_simbolo, monedas_factor, monedas_status, monedas_id) {
    return new Promise((res, rej) => {
      connection.query(props.query_updateCurrency, [database, table, monedas_des, monedas_simbolo, monedas_factor, monedas_status, monedas_id], function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      })
    })
  },

  delete: function (database, table, monedas_id) {
    return new Promise((res, rej) =>{
      connection.query(props.query_deleteCurrency, [database, table, monedas_id], function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      })
    })
  }

};
