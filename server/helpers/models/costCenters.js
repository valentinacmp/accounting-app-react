const props = require("../props/properties.js");
const connection = require("../config/database.js");

var Promise = require("promise");

module.exports = {
  get: function(database, table) {
    return new Promise((res, rej) => {
      connection.query(props.query_get, [database, table], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
          console.log(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  },

  create: function(database, table, centros_de_costos_cod, indicator,replace, centros_de_costos_des, centros_de_costos_status, centros_de_costos_created_at) {
    return new Promise((res, rej) => {
      connection.query(props.query_checkCC, [database, table, centros_de_costos_cod],
        function(error, result) {
          console.log('here', result);

          if (result.length === 0) {
            connection.query(props.query_createCC, [database, table,
                centros_de_costos_cod, indicator, replace,centros_de_costos_des, centros_de_costos_status, centros_de_costos_created_at], function(error, result) {
                if (!error) {
                  res(result);
                  console.log(result);
                } else {
                  rej(error);
                  // console.log('here',error);
                }
              }
            );
          } else {
            rej(error);
            console.log("Centro de costo ya existe!", error);
          }
        }
      );
    });
  }
};
