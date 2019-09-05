const props = require("../props/properties.js");
const connection = require("../config/database.js");
const Promise = require("promise");

module.exports = {
  get: function(database, table) {
    return new Promise((res, rej) => {
      connection.query(props.query_get, [database, table], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  },

  create: function(database,table,partidas_presupuestarias_cod,partidas_presupuestarias_des,partidas_presupuestarias_espec,partidas_presupuestarias_responsable,partidas_presupuestarias_partida,partidas_presupuestarias_cc,partidas_presupuestarias_cuentas,partidas_presupuestarias_mod,partidas_presupuestarias_total,partidas_presupuestarias_fecha_inicio,partidas_presupuestarias_fecha_fin,partidas_presupuestarias_status,partidas_presupuestarias_created_at) {
    return new Promise((res, rej) => {
      connection.query(props.query_checkBudget,[database, table, partidas_presupuestarias_des], function(error, result) {
        if (result.length === 0) {
          connection.query(props.query_createBudget, [database, table, partidas_presupuestarias_cod, partidas_presupuestarias_des,partidas_presupuestarias_espec,partidas_presupuestarias_responsable,partidas_presupuestarias_partida,partidas_presupuestarias_cc,partidas_presupuestarias_cuentas,partidas_presupuestarias_mod,partidas_presupuestarias_total,partidas_presupuestarias_fecha_inicio,partidas_presupuestarias_fecha_fin,partidas_presupuestarias_status,partidas_presupuestarias_created_at],function(error, result) {
            if (!error) {
              res(result);
              console.log(result);
            } else {
              rej(error);
              console.log(error);
            }
          });
        } else {
          rej(error);
          console.log("Error: Ya existe");
        }
      });
    });
  },

  put: function(database,table,partidas_presupuestarias_cod,partidas_presupuestarias_des,partidas_presupuestarias_espec,partidas_presupuestarias_responsable,partidas_presupuestarias_partida,partidas_presupuestarias_cc,partidas_presupuestarias_cuentas,partidas_presupuestarias_mod,partidas_presupuestarias_total,partidas_presupuestarias_fecha_inicio,partidas_presupuestarias_fecha_fin,partidas_presupuestarias_status, partidas_presupuestarias_id) {
    return new Promise((res, rej) => {
      connection.query(props.query_updateBudget, [database,table,partidas_presupuestarias_cod,partidas_presupuestarias_des,partidas_presupuestarias_espec,partidas_presupuestarias_responsable,partidas_presupuestarias_partida,partidas_presupuestarias_cc,partidas_presupuestarias_cuentas,partidas_presupuestarias_mod,partidas_presupuestarias_total,partidas_presupuestarias_fecha_inicio,partidas_presupuestarias_fecha_fin,partidas_presupuestarias_status, partidas_presupuestarias_id],
        function(error, result) {
          if (!error) {
            res(result);
          } else {
            rej(error);
            console.log(error);
          }
        }
      );
    });
  },

  delete: function(database, table, partidas_presupuestarias_id) {
    return new Promise((res, rej) => {
      connection.query(props.query_deleteBudget, [database, table, partidas_presupuestarias_id],
        function(error, result) {
          if (!error) {
            res(result);
          } else {
            rej(error);
            console.log(error);
          }
        }
      );
    });
  },

  createCC: function(database, table, partidas_presupuestarias_id, partidas_presupuestarias_cc_partida , partidas_presupuestarias_cc_total, partidas_presupuestarias_cc_codigo, partidas_presupuestarias_cc_des, partidas_presupuestarias_cc_pres, partidas_presupuestarias_cc_asig, partidas_presupuestarias_cc_dif, partidas_presupuestarias_cc_created_at){
    return new Promise((res, rej) =>{
      connection.query(props.query_createBudgetCC, [database, table, partidas_presupuestarias_id, partidas_presupuestarias_cc_partida , partidas_presupuestarias_cc_total, partidas_presupuestarias_cc_codigo, partidas_presupuestarias_cc_des, partidas_presupuestarias_cc_pres, partidas_presupuestarias_cc_asig, partidas_presupuestarias_cc_dif, partidas_presupuestarias_cc_created_at],function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
        }
      })
    })
  },

  getCC: function (database, table, partidas_presupuestarias_id) {
    return new Promise((res, rej) => {
      connection.query(props.query_getBudgetCC, [database, table, partidas_presupuestarias_id], function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
        }
      })
    })
  }
};
