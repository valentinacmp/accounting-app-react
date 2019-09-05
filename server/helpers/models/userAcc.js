const props = require("../props/properties.js");
const connection = require("../config/database.js");
const Promise = require("promise");
const crypto = require("crypto");

module.exports = {
  create: function(database, table, usuario_nombre, usuario_des,usuario_clave, usuario_created_at, usuario_expiration_date,usuario_status, usuario_ubicacion, usuario_email, usuario_grupo,  usuario_acceso_empresa, usuarios_accesos) {
    return new Promise((res, rej) => {
      connection.query(props.checkUserAcc, [database, table, usuario_nombre], function (error, result) {
        if(result.length === 0){
          connection.query(props.createUserAcc, [database, table,usuario_nombre, usuario_des, usuario_clave, usuario_created_at, usuario_expiration_date, usuario_status,usuario_ubicacion, usuario_email, usuario_grupo,usuario_acceso_empresa, usuarios_accesos], function(error, result) {
            if (!error) {
              res(result);
            } else {
              rej(error);
              console.log(error);
            }
          });
        } else {
          rej(error);
          console.log("Error create user: user exists", error);
        }
      })
    });
  },

  getUserAcc: function(database, table) {
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

  //CREATE USER - TABLE WEBUSUARIO

  createAccUser: function(
    user_username,
    user_password,
    user_perfilName,
    user_created_at,
    user_type,
    user_perfil,
    user_consecutive,
    user_serial
  ) {
    return new Promise((res, rej) => {
      //CHECK IF USER EXISTS
      connection.query(props.checkAccUser, [user_username], function(
        error,
        result
      ) {
        if (result.length == 0) {
          let hashedPass = crypto
            .createHash("md5")
            .update(user_password)
            .digest("hex");
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
                console.log(error);
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

  //CREATE USER PROFILE

  createUserProfileAcc: function(userCreador_id, user_id) {
    return new Promise((res, rej) => {
      connection.query(
        props.createUserProfileAcc,
        [userCreador_id, user_id],
        function(error, result) {
          if (!error) {
            res(result);
            console.log(result);
          } else {
            rej(error);
          }
        }
      );
    });
  },

  //CREATE USER RESTRICTIONS

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

  //OBTENER ID DEL USUARIO CREADOR

  getUserid: function(user_id) {
    return new Promise((res, rej) => {
      connection.query(props.query_creatorId, [user_id], function(error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  },

  //OBTENER PERMISOS DEL USUARIO

  getPermissions: function(database) {
    return new Promise((res, rej) =>{
      connection.query(props.query_permissions, [database], function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    });
  },

  //ELIMINAR USUARIO DE WEBSUAURIO / EMPRESAN_N 

  delete: function (database, table, usuario_nombre) {
    return new Promise((res, rej) =>{
      connection.query(props.query_deleteUserAcc, [database, table, usuario_nombre], function (e, results) {
        if(!e){
          res(results);
          connection.query(props.query_deleteFromC2, [usuario_nombre], function (error, result) {
            if(!error){
              res(result);
            } else {
              rej(error);
              console.log('error');
            }
          });
        } else {
          rej(e)
          console.log('error');
        }
      })
    });
  },

  //ELIMINAR TODOS LOS USUARIOS 

  deleteAllUsers: function (database, table, usuario_acceso_empresa) {
    return new Promise((res, rej) =>{
      connection.query(props.query_deleteAllUserAcc, [database, table, usuario_acceso_empresa], function (error, result) {
        if(error){
          res(result);
        } else {
          rej(error);
        }
      })
    });
  },

  //ELIMINAR USUARIO EN WEBUSUARIO
  deleteUser: function (usuario_nombre) {
    return new Promise((res, rej) =>{
      connection.query(props.query_deleteFromC2, [usuario_nombre], function (error, result) {
        if(!error){
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      });
    })
  },

  //UPDATE USUARIO EN EMPRESAN_N
  
  update: function (database, table, usuario_nombre, usuario_des, usuario_clave, usuario_expiration_date, usuario_status, usuario_ubicacion, usuario_email, usuario_acceso_empresa, usuarios_accesos,user_id) {
    return new Promise((res, rej) =>{
      // connection.query(props.checkAccUser, [usuario_nombre], function (error, result) {
      //   if(result.length == 0){
          connection.query(
            props.query_updateUserAcc,
            [
              database,
              table,
              usuario_nombre,
              usuario_des,
              usuario_clave,
              usuario_expiration_date,
              usuario_status,
              usuario_ubicacion,
              usuario_email,
              usuario_acceso_empresa,
              usuarios_accesos,
              user_id
            ],
            function(error, result) {
              if (!error) {
                res(result);
              } else {
                rej(error);
                console.log(error);
              }
            }
          );
        // } else{
        //   rej(error);
        //   console.log('Error: nombre de usuario ya existe')
        // }
      // })
      
    })
  }
};
