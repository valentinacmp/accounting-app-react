const express = require('express');
const props = require('./../helpers/props/properties');
const user = require('./../helpers/models/user.js')
let router = express.Router();
let cors = require('cors');

router.use(cors());

//Get Users
router.get('/', (req, res) => {
  user.getAllUsers().then(users => {
    res.send({
      users: users,
      status: 200
    });
    console.log('Result', users);
  }).catch(error => {
    res.status(400).json(error);
  })
});

//Get Users
router.get('/web', (req, res) => {
  user.getUser().then(users => {
    res.send({
      users: users,
      status: 200
    });
    console.log('Result', users);
  }).catch(error => {
    res.status(400).json(error);
  })
});


//Update User
router.put('/:user_id', (req, res) => {
  user.update(props.database, req.body.user_name, req.body.user_lastname, req.body.user_username, req.body.user_role, req.body.user_email, req.body.user_password, req.body.user_address, req.body.user_status, req.body.user_type, req.body.user_expiration_date, req.params.user_id).then(result => {
    res.status(200).json({
      result: result,
      message: "Usuario " + req.body.user_name + " editado!"
    })
  }).catch(error => {
    res.status(400).json(error);
  })
});

//Delete User
router.delete('/:user_id', (req, res) => {
  user.delete(props.database, req.params.user_id).then(result => {
    res.status(200).json({
      result: result,
      message: 'Usuario elimnado!'
    });
  }).catch(error => {
    res.status(400).json({
      result: error,
    })
  })
});

//Get accounting users

router.get('/acc', (req, res) =>{
  user.getAccoUser().then(users => {
    res.send({
      users: users,
      status: 200
    });
    console.log('Result', users);
  }).catch(error => {
    res.status(400).json(error);
  })
});

router.get('/accUser/:user_username', (req, res) => {
  user.getUserId(req.params.user_username).then(result => {
    // res.send({
    //   result: result,
    //   status: 200
    // });

    console.log("Result", result[0].idUser);

    const userId = result[0].idUser;

    for (let i = 1; i< 6; i++) {
      const database = "empresa" + userId + '_' + i; 
      console.log(database);

      //DROP DATABASES
      user.dropDB(database).then(results=> {
        res.status(200).json({
          result: result,
          results: results        
        });
        
      }).catch(error => {
        res.status(400).json(error)
      })
    }


  }).catch(error => {
    res.status(400).json(error);
  })
});

router.delete("/deleteAcc/:userId", (req, res) => {
  //DELETE ACC USER
  user
    .deleteAccUser(req.params.userId)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//Create databases 

router.post('/assignDB', (req, res) => {

  user.getUserByName(req.body.user_username).then(result => {
    // res.send({
    //   user: result,
    //   status: 200,
    // });
    resultado = result;
    var objResult = JSON.stringify(result)
    var resultado = JSON.parse(objResult);
    console.log('User id ->', resultado[0].idUser);
    console.log('User perfil ->', resultado[0].nombre_perfil);

    user.createUserProfile(resultado[0].idUser, req.body.user_username).then(results => {
      // res.status(200).json({
      //   result: results,
      //   message: 'Usuario Creado!'
      // });
      resultados = results;
      console.log('User Profile id ->', resultados.insertId);

      user.createUserRestrictions(resultado[0].idUser, resultados.insertId).then(userRes => {
        res.status(200).json({
          result: userRes,
          message: ' usuario creado con exito'
        });
      }).catch(error => {
        res.status(400).json(error);
      })

    }).catch(error => {
      res.status(400).json(error);
    })

    for (var i = 1; i < 6; i++) {
      var db = "empresa" + resultado[0].idUser + "_" + i;
      user.createDB(db).then(result => {
        console.log('resultado', result.warningCount);
        if (result.warningCount === 1) {
          console.log('Ya existe');
          res.send({
            user: result,
            status: 200,
            message: 'Ya existe'
          });
        } else {
          res.status(200).json({
            result: result,
            message: 'Base de datos asigandas!'
          });
          console.log('Creada')
          for (var i = 1; i < 6; i++) {

            var database = "empresa" + resultado[0].idUser + "_" + i;
            var tableName = {
              empresa: "empresa_aa",
              activos: "activos",
              cc: "centros_de_costos",
              comprobantes: "comprobantes",
              monedas: "monedas",
              partidas: "partidas_presupuestarias",
              plan: "plan_de_cuentas",
              terceros: "terceros",
              noTaken: "no_taken",
              user: "user_username",
              usuarios: "usuarios"
            };

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

            //Table usuarios asignados por el master
            user.tableUsuarios(database, tableName.usuarios).then(result => {
              res.status(200).json(result);
            }).catch(error => {
              res.status(400).json(error)
            })
          }
        }
      }).catch(error => {
        res.status(400).json(error)
        console.log(error,'eror')
      })
    }
  }).catch(error => {
    res.status(400).json(error);
  })
});

//User created by master

router.post('/create/:idUserCreador', (req, res) => {

  user.getUserByName(req.body.user_username).then(result => {
    resultado = result;
    var objResult = JSON.stringify(result)
    var resultado = JSON.parse(objResult);
    console.log('User id ->', resultado[0].idUser);
    console.log('User perfil ->', resultado[0].nombre_perfil);

    user.createUserAccProfile(resultado[0].idUser, req.params.idUserCreador, req.body.user_username).then(results => {
      resultados = results;
      console.log('User Profile id ->', resultados.insertId);

      user.createUserRestrictions(resultado[0].idUser,resultados.insertId).then(userRes => {
        res.status(200).json({
          result: userRes,
          message: 'Usuario creado con exito'
        });
      }).catch(error => {
        res.status(400).json(error);
      })

    }).catch(error => {
      res.status(400).json(error);
    })
  }).catch(error => {
    res.status(400).json(error);
  })
});

module.exports = router;