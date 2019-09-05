const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth');
const jwt = require('jsonwebtoken');

let props = require('./../helpers/props/properties');
let config = require('./../helpers/config/config');
let router = express.Router();
let user = require('./../helpers/models/user');

let User = require('./../helpers/models/user');

// let cors = require('cors');
// router.use(cors());

router.post('/login', auth.isLogged, function (req, res, next) {
  passport.authenticate('local', {
    session: false
  }, function (err, user, info) {
    console.log('login',user.idUser);
    // console('req',req);
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send({
        message: 'Contraseña y/o Usuario Incorrecta'
      });
    }

    User.checkModule(user.idUser).then(result => {
      req.logIn(user, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: 'Could not log in user'
          });
        }

        let userObj = JSON.parse(JSON.stringify(user));
        let jsonWebToken = jwt.sign(userObj, config.secret);
        req.session.token = jsonWebToken;
        // console.log(req.session.token, 'here')
        res.status(200).send({
          message: "Usuario Loggeado / Acceso Permitido",
          userType: user.tipoUsuario,
          userId: user.idUser,
          token: jsonWebToken,
          authenticated: req.isAuthenticated()
        });
      });
    }).catch(error =>{
      res.status(400).send({
        message: 'Acceso Denegado!',
        error: error
      });
    })
  })(req, res, next);
});

router.post('/register', auth.isLogged, (req, res) => {

  const today = new Date();
  var user_created_at = today;
  var resultado = "";

  const user_data = {
    perfilWeb: 'Usuario Web',
    perfilAcc: 'Usuario Contable',
    typeWeb: 1,
    typeAcc: 3,
    perfil: 0,
    consecutive: 01,
    serial: -23
  }

  //Insert user in table webusuario 

  user.createAccUser(req.body.user_username, req.body.user_password, user_data.perfilWeb, user_created_at, user_data.typeWeb, user_data.perfil, user_data.consecutive, user_data.serial).then(result => {

    // res.status(200).json({
    //   result: result,
    //   message: 'Usuario creado en webusuario'
    // });

    resultado = result;
    console.log("User id ->", resultado.insertId)

    //Insert User in table usariobdd

    //const bdd = "empresa" + resultado.insertId;

    user.createUserProfile(resultado.insertId).then(results => {
      res.status(200).json({
        result: results,
        message: 'Usuario Creado!'
      });
      resultados = results;
      console.log('User Profile id ->', resultados.insertId);

      user.createUserRestrictions(resultado.insertId, resultados.insertId).then(userRes => {
        res.status(200).json({
          result: userRes,
          message: ' usuario creado con exito'
        });
      }).catch(error => {
        res.status(400).json(error);
      })
      
    }).catch(error => {
      res.status(400).json({
        error: error
      });
    })


    user.insertAccUser(req.body.user_company, req.body.user_sucursal, req.body.user_username, user_data.perfilWeb, req.body.user_password, user_data.typeWeb, user_data.consecutive, user_data.serial).then(result => {
      res.status(200).json(result);
    }).catch(error => {
      res.status(400).json(error);
    })

    for (var i = 1; i < 6; i++) {

      const database = "empresa" + resultado.insertId + "_" + i;
      
      const tableName = {
        empresa: "empresa_aa",
        activos: "activos",
        cc: "centros_de_costos",
        comprobantes: "comprobantes",
        monedas: "monedas",
        partidas: "partidas_presupuestarias",
        plan: "plan_de_cuentas",
        terceros: "terceros",
        noTaken: "no_taken",
        user: 'user_username',
        usuarios: 'usuarios'
      };


      user.createDB(database).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Empresa
      user.tableEmpresa(database, tableName.empresa).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Activos
      user.tableActivos(database, tableName.activos).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Centros de Costos
      user.tableCC(database, tableName.cc).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Comprobantes
      user.tableComprobantes(database, tableName.comprobantes).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Monedas
      user.tableMonedas(database, tableName.monedas).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Partidas Presupuestarias
      user.tablePartidas(database, tableName.partidas).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Plan de cuentas
      user.tablePlan(database, tableName.plan).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Terceros
      user.tableTerceros(database, tableName.terceros).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //No taken
      user.tableNoTaken(database, tableName.noTaken).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //User 
      user.tableUser(database, tableName.user).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      //Insert User
      user.insertUser(database, tableName.user, req.body.user_username).then(result => {
        res.status(200).json(result);
      }).catch(error => {
        res.status(400).json(error)
      })

      user.tableUsuarios(database, tableName.usuarios).then(result => {
              res.status(200).json(result);
            }).catch(error => {
              res.status(400).json(error)
            })
    }
  }).catch(error =>{
    res.status(400).json({
      error: error,
      message: 'El usuario: ' + req.body.user_username + ' ya existe. Ingrese otro nombre de usuario'
    });
  })
});

router.get('/logout', auth.isAuth, function (req, res) {

  req.logout();

  // req.session = null; 

  cookie = req.cookies;
  
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    res.cookie(prop, "", { expires: new Date(0) });
  }

  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    // The response should indicate that the user is no longer authenticated.
    return res.status(200).send({
      status: 'Sesión Cerrada!',
      authenticated: req.isAuthenticated()
    });
  });
});

// router.get('/logout', auth.isAuth, function (req, res) {
//   req.logout();

//   res.status(200).send({
//     status: 'Sesión Cerrada!',
//     authenticated: req.isAuthenticated()
//   });
// });


function ensureLoggedIn() {
  return function(req, res, next) {
    // isAuthenticated is set by `deserializeUser()`
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(401).send({
        success: false,
        message: 'You need to be authenticated to access this page!'
      })
    } else {
      next()
      res.status(200).send({ success: true, message: "You are authenticated" });
    }
  }
}

router.get('/logout/check', ensureLoggedIn(), (req, res, next) => {
  // res.send({ success: true, message: 'You are authenticated' })
})

module.exports = router;