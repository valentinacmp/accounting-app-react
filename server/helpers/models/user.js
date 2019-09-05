const props = require('../props/properties.js');
const connection = require('../config/database.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const ReverseMd5 = require('reverse-md5');

var reverseMd5 = ReverseMd5({
  lettersUpper: false,
  lettersLower: true,
  numbers: true,
  special: false,
  whitespace: true,
  maxLen: 12
})

var Promise = require('promise');


module.exports = {
  getUserByEmail: function(user_email) {
    return new Promise((res, rej) => {
      connection.query(props.getUserByEmail, [user_email], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("Error", error);
        }
      });
    });
  },

  getUser: function() {
    return new Promise((res, rej) => {
      connection.query(props.getUser, function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
        }
      });
    });
  },

  users: function() {
    return new Promise((res, rej) => {
      connection.query(props.getUsers, function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("Error", error);
        }
      });
    });
  },

  //Get users - TABLE USUARIOBDD

  getAllUsers: function() {
    return new Promise((res, rej) => {
      connection.query(props.getAllUsers, function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("Error", error);
        }
      });
    });
  },

  //Get users - TABLE WEBUSUARIO

  getUserByName: function(user_username) {
    return new Promise((res, rej) => {
      connection.query(props.getUserByName, [user_username], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
          console.log("result", result);
          //Check if user exists
          if (result.length == 0) {
            console.log("No se encuentra registrado");
          }
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  },

  getAccoUser: function() {
    return new Promise((res, rej) => {
      connection.query(props.getAccoUser, function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
        }
      });
    });
  },

  getAccUser: function() {
    return new Promise((res, rej) => {
      connection.query(props.getAccUser, function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
        }
      });
    });
  },

  //CHECK USER MODULE

  checkModule: function(user_id) {
    return new Promise((res, rej) => {
      connection.query(props.checkModule, [user_id], function(error, result) {
        if (result.length == 0) {
          rej(error);
        } else {
          res(result);
        }
      });
    });
  },

  comparePassword: function(candidatePassword, hash) {
    return new Promise((res, rej) => {
      // let hashedPass = bcrypt.hashSync(hash, 10);

      //console.log(reverseMd5(hash).str)

      bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        console.log("Aqui candidate", candidatePassword);
        console.log("Aqui hash", hash);
        // if (err) throw rej(err);
        // res(isMatch);
        if (!err) {
          res(isMatch);
          console.log(isMatch);
        } else {
          rej(err);
          console.log("Error while checking password", err);
        }
      });
    });
  },

  //CREATE USER - TABLE WEBUSUARIO

  createAccUser: function(
    user_username,
    user_password,
    user_perfilName,
    user_created_at,
    user_type,
    user_perfil,
    user_consecutive,
    user_serial,
    bdd
  ) {
    return new Promise((res, rej) => {
      connection.query(props.checkAccUser, [user_username], function(
        error,
        result
      ) {
        if (result.length == 0) {
          let hashedPass = crypto
            .createHash("md5")
            .update(user_password)
            .digest("hex");

          // let hashedPass = bcrypt.hashSync(user_password, 10, function (err, hash) {
          //   if (!err) {
          //     console.log(hash)
          //   } else {
          //     console.log(err)
          //   }
          // });

          connection.query(
            props.createAccUser,
            [
              user_username,
              user_password,
              hashedPass,
              user_perfilName,
              user_created_at,
              user_type,
              user_perfil,
              user_consecutive,
              user_serial
            ],
            function(error, result) {
              if (!error) {
                res(result);
              } else {
                rej(error);
              }
            }
          );
        } else {
          rej(error);
          console.log("Error create acc user: user exists", error);
        }
      });
    });
  },

  insertAccUser: function(
    user_company,
    user_sucursal,
    user_username,
    user_perfilName,
    user_password,
    user_type,
    user_consecutive,
    user_serial
  ) {
    return new Promise((res, rej) => {
      connection.query(
        props.insertAccUser,
        [
          user_company,
          user_sucursal,
          user_username,
          user_perfilName,
          user_password,
          user_type,
          user_consecutive,
          user_serial
        ],
        function(error, result) {
          if (!error) {
            res(result);
          } else {
            rej(error);
            console.log("Error create acc user: error in usuariobdd", error);
          }
        }
      );
    });
  },

  insertAcc: function(idUser) {
    return new Promise((res, rej) => {
      connection.query(props.insertAcc, [idUser], function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log("Error create acc user: error in usuariobdd", error);
        }
      });
    });
  },

  // Create user acc profile type -> 3

  createUserAccProfile: function(user_id, idUserCreador, user_username) {
    return new Promise((res, rej) => {
      connection.query(props.checkAccoUser, [user_username], function(
        error,
        result
      ) {
        if (result.length == 0) {
          connection.query(props.createUserAccProfile, [idUserCreador, user_id], function(
            error,
            result
          ) {
            if (!error) {
              res(result);
              console.log(result);
            } else {
              rej(error);
            }
          });
        } else {
          rej(error);
          console.log("Error");
        }
      });
    });
  },

  // Create user profile

  createUserProfile: function(user_id, user_username) {
    return new Promise((res, rej) => {
      connection.query(props.checkAccoUser, [user_username], function(
        error,
        result
      ) {
        if (result.length == 0) {
          connection.query(props.createUserProfile, [user_id], function(
            error,
            result
          ) {
            if (!error) {
              res(result);
              console.log(result);
            } else {
              rej(error);
            }
          });
        } else {
          rej(error);
          console.log("Error: Ya tiene base dados asignadas");
        }
      });
    });
  },

  //Create user restrictions

  createUserRestrictions: function(user_id, userprofile_id) {
    return new Promise((res, rej) => {
      connection.query(
        props.createUserRestrictions,
        [user_id, userprofile_id],
        function(error, result) {
          if (!error) {
            res(result);
            console.log(result);
          } else {
            rej(error);
            console.log(error);
          }
        }
      );
    });
  },

  create: function(
    user_email,
    user_username,
    databaseName,
    user_name,
    user_lastname,
    user_username,
    user_email,
    user_password,
    user_address,
    user_created_at
  ) {
    return new Promise((res, rej) => {
      connection.query(props.checkUser, [user_email, user_username], function(
        error,
        result
      ) {
        if (result.length == 0) {
          //  let hashedPass = bcrypt.hashSync(user_password, 10);

          let hashedPass = bcrypt.hashSync(user_password, 10, function(
            err,
            hash
          ) {
            if (!err) {
              console.log(hash);
            } else {
              console.log(err);
            }
          });

          connection.query(
            props.createUser,
            [
              databaseName,
              user_name,
              user_lastname,
              user_username,
              user_email,
              hashedPass,
              user_address,
              user_created_at
            ],
            function(err, user) {
              if (!err) {
                res(user);
              } else {
                rej(err);
              }
            }
          );
        } else {
          rej(error);
          console.log("Error create user", error);
        }
      });
    });
  },

  delete: function(databaseName, user_id) {
    return new Promise((res, rej) => {
      connection.query(props.deleteUser, [databaseName, user_id], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
          console.log(result);
        } else {
          rej(error);
          console.log("Error", error);
        }
      });
    });
  },

  update: function(
    databaseName,
    user_name,
    user_lastname,
    user_username,
    user_role,
    user_email,
    user_password,
    user_address,
    user_status,
    user_type,
    user_expiration_date,
    user_id
  ) {
    return new Promise((res, rej) => {
      connection.query(
        props.updateUser,
        [
          databaseName,
          user_name,
          user_lastname,
          user_username,
          user_role,
          user_email,
          user_password,
          user_address,
          user_status,
          user_type,
          user_expiration_date,
          user_id
        ],
        function(error, result) {
          if (!error) {
            res(result);
          } else {
            rej(error);
            console.log("Error", error);
          }
        }
      );
    });
  },

  createDB: function(databaseName) {
    return new Promise((res, rej) => {
      connection.query(props.createDatabase, [databaseName], function(
        error,
        result
      ) {
        if (!error) {
          res(result);
          // console.log('es 1 o 0->',result.warningCount, result)
          // if (result.warningCount === 1) {
          //   console.log('Ya existe')
          // } else {
          //   console.log('Creada')
          // }
        } else {
          rej(error);
          console.log(
            "El usuario ya tiene base de datos regitradas en Accounting app"
          );
        }
      });
    });
  },

  checkDB: function(databaseName) {
    return new Promise((res, rej) => {
      connection.query(props.checkDatabases, [databaseName], function(
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

  //Create Tables

  tableEmpresa: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableEmpresa, [databaseName, tableName], function(
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

  tableActivos: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableActivos, [databaseName, tableName], function(
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

  tableCC: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableCC, [databaseName, tableName], function(
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

  tableComprobantes: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(
        props.tableComprobantes,
        [databaseName, tableName],
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

  tableMonedas: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableMonedas, [databaseName, tableName], function(
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

  tablePartidas: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tablePartidas, [databaseName, tableName], function(
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

  tablePlan: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tablePlan, [databaseName, tableName], function(
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

  tableTerceros: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableTerceros, [databaseName, tableName], function(
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

  tableNoTaken: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.noTaken, [databaseName, tableName], function(
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

  tableUser: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableUser, [databaseName, tableName], function(
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

  tableUsuarios: function(databaseName, tableName) {
    return new Promise((res, rej) => {
      connection.query(props.tableUsuarios, [databaseName, tableName], function(
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

  insertUser: function(databaseName, tableName, username) {
    return new Promise((res, rej) => {
      connection.query(
        props.inserUser,
        [databaseName, tableName, username],
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

  dropDB: function(database) {
    return new Promise((res, rej) => {
      connection.query(props.query_deleteDB, [database], function(
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

  getUserId: function(user_name) {
    return new Promise((res, rej) => {
      connection.query(props.getUserId, [user_name], function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  },

  deleteAccUser: function(userId) {
    return new Promise((res, rej) => {
      connection.query(props.deleteAccUser, [userId], function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  }
};