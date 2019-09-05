const props = require('./../props/properties.js');
const connection = require('./../config/database.js');
var Promise = require('promise');

module.exports = {
  databases: function(table) {
    return new Promise((res, rej) => {
      connection.query(props.databases, [table], function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  allDatabases: function() {
    return new Promise((res, rej) => {
      connection.query(props.showDatabases, function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  getCompanyName: function(database, table) {
    return new Promise((res, rej) => {
      connection.query(props.query_companyName, [database, table], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  // getCompany: function(database, table) {
  //   return new Promise((res, rej) => {
  //     connection.query(props.getCompanies, [database, table], function(
  //       error,
  //       result
  //     ) {
  //       if (!error) {
  //         const array = [];
  //         console.log('model',result)
  //         array.push({empresa: result});
  //         res(array);
  //       } else {
  //         rej(error);
  //         console.log("error", error.sqlMessage);
  //       }
  //     });
  //   });
  // },

  company: function(database, table) {
    return new Promise((res, rej) => {
      connection.query(props.getCompanies, [database, table], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  taken: function(table) {
    return new Promise((res, rej) => {
      connection.query(props.databases, [table], function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  createTable: function(database, table) {
    return new Promise((res, rej) => {
      connection.query(props.createTable, [database, table], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  create: function(
    database,
    table,
    empresa_des,
    empresa_direccion,
    empresa_contacto,
    empresa_ciudad,
    empresa_telefono,
    empresa_rif,
    empresa_telefax,
    empresa_email,
    empresa_website,
    empresa_status,
    empresa_fecha_inicio,
    empresa_fecha_fin,
    empresa_separador_pc,
    empresa_mascara_pc,
    empresa_simbolo,
    empresa_fecha_mov,
    empresa_centros_costos,
    empresa_correlativo,
    empresa_num_lineas,
    empresa_separador_cc,
    empresa_mascara_cc,
    empresa_created_at
  ) {
    return new Promise((res, rej) => {
      if (database && typeof database === "string" && connection.query) {
        connection.query(
          props.createCompany,
          [
            database,
            table,
            empresa_des,
            empresa_direccion,
            empresa_contacto,
            empresa_ciudad,
            empresa_telefono,
            empresa_rif,
            empresa_telefax,
            empresa_email,
            empresa_website,
            empresa_status,
            empresa_fecha_inicio,
            empresa_fecha_fin,
            empresa_separador_pc,
            empresa_mascara_pc,
            empresa_simbolo,
            empresa_fecha_mov,
            empresa_centros_costos,
            empresa_correlativo,
            empresa_num_lineas,
            empresa_separador_cc,
            empresa_mascara_cc,
            empresa_created_at
          ],
          function(error, result) {
            if (!error) {
              res(result);
            } else {
              rej(error);
              console.log("error", error);
            }
          }
        );
      }
    });
  },

  dropTable: function(database, table) {
    return new Promise((res, rej) => {
      connection.query("USE ??", [database], function(err, result) {
        if (err) {
          console.log(err);
          rej(err.toString());
        }
        connection.query("DROP TABLE ??", [table], function(err, result) {
          if (err) {
            console.log(err);
            // Displays human-readable errors
            rej(err.toString());
          } else {
            res(table);
          }
        });
      });
    });
  },

  delete: function(database, table) {
    return new Promise((res, rej) => {
      connection.query(props.deleteCompany, [database, table], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("error", error.sqlMessage);
        }
      });
    });
  },

  update: function(
    database,
    table,
    empresa_des,
    empresa_direccion,
    empresa_contacto,
    empresa_ciudad,
    empresa_telefono,
    empresa_rif,
    empresa_telefax,
    empresa_email,
    empresa_website,
    empresa_status,
    empresa_fecha_inicio,
    empresa_fecha_fin,
    empresa_separador_pc,
    empresa_mascara_pc,
    empresa_simbolo,
    empresa_fecha_mov,
    empresa_centros_costos,
    empresa_correlativo,
    empresa_num_lineas,
    empresa_separador_cc,
    empresa_mascara_cc,
    empresa_created_at
  ) {
    return new Promise((res, rej) => {
      if (database && typeof database === "string" && connection.query) {
        connection.query(
          props.updateCompany,
          [
            database,
            table,
            empresa_des,
            empresa_direccion,
            empresa_contacto,
            empresa_ciudad,
            empresa_telefono,
            empresa_rif,
            empresa_telefax,
            empresa_email,
            empresa_website,
            empresa_status,
            empresa_fecha_inicio,
            empresa_fecha_fin,
            empresa_separador_pc,
            empresa_mascara_pc,
            empresa_simbolo,
            empresa_fecha_mov,
            empresa_centros_costos,
            empresa_correlativo,
            empresa_num_lineas,
            empresa_separador_cc,
            empresa_mascara_cc,
            empresa_created_at
          ],
          function(error, result) {
            if (!error) {
              res(result);
            } else {
              rej(error);
              console.log("error", error.sqlMessage);
            }
          }
        );
      }
    });
  }
};