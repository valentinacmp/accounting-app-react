const express = require('express');
const connection = require('./../helpers/config/database.js');
const company = require('./../helpers/models/companies.js')
let router = express.Router();
let cors = require('cors');
var Promise = require('promise');

router.use(cors());

//Get Databases Available

router.get('/allDatabases', (req, res)=>{
  company.allDatabases().then(company => {
    res.send({
      databases: company,
      status: 200
    });
    console.log('resultado', company);
  }).catch(error => {
    res.status(400).json(error);
  });
});

//GET DATABASES AND COMPANY DATA 

router.get('/allCompanies/:user_id', (req, res) =>{
  const table = "taken";
  const table2 = "empresa_aa";
  let companies = "";
  let arr = [];
  let empresa = '';
  let array = [];
  const array2 = [];

  company.databases(table).then(result => {
    res.send({
      databases: result,
      status: 200
    });
    companies = JSON.parse(JSON.stringify(result));
    // console.log("resultado", companies);

    for (let index = 0; index < companies.length; index++) {
      const element = companies[index].TABLE_SCHEMA;
      if((element.startsWith('empresa'+req.params.user_id+'_')) === true) {
        const filter = element;
        arr.push(filter);
      }
    }

    // console.log(arr)

    for (let i = 0; i < arr.length; i++) {
      const db = arr[i];
      // console.log(db);
      company.company(db, table2).then(results => {
        for (let i = 0; i < results.length; i++) {
          const items = JSON.parse(JSON.stringify(results[i]));
          array.push({ empresa_des: items.empresa_des });
        }
        empresa = array;
        return empresa;
        // console.log(array)
        // res.send({
        //   databases: empresa,
        //   status: 200
        // });

        // console.log([1, [2], [3, [[4]]]].flat(2));
        // console.log(empresa);
      }).catch(error => {
        res.status(400).send(error);
      });
      // console.log(empresa);
      // break;
    }

    // console.log(empresa);


    // array.push({
    //   empresa: empresa
    // });

    // res.send({
    //   databases: empresa,
    //   status: 200
    // });

    // console.log('here',empresa);
  })
    .catch(error => {
      res.status(400).json(error);
    });
    
});

//Get Databases Available

router.get('/databases', (req, res)=>{
  var table = 'no_taken';
  company.databases(table).then(company => {
    res.send({
      databases: company,
      status: 200
    });
    console.log('resultado', company);
  }).catch(error => {
    res.status(400).json(error);
  });
});

//Get Company Name

router.get('/:database/', (req, res) => {
  
  const empresa_aa = "empresa_aa";

  company.getCompanyName(req.params.database, empresa_aa).then(result => {
    res.status(200).send({
      result: result
    });
    console.log("resultado", result);
  }).catch(error => {
    res.status(400).json(error);
  });
});

//Get Databaseas Taken

router.get('/databases/taken', (req, res) => {
  var table = 'taken';
  company.taken(table).then(company => {
    res.send({
      databases: company,
      status: 200
    });
    console.log('resultado', company);
  }).catch(error => {
    res.status(400).json(error);
  });
});

//Get Companies created

router.get('/:database/:table', (req, res) => {
  company.company(req.params.database, req.params.table).then(result => {
    res.send({
      result: result,
      status: 200
    });
    console.log('resultado', result);
  }).catch(error => {
    res.status(400).json(error);
  });
})

//Delete Table
router.delete('/:database/:table', (req, res) =>{
  company.dropTable(req.params.database, req.params.table).then(result =>{
    res.send({
      result: result,
      status: 200,
      message: 'Tabla ' + `'` + req.params.table + `'` + ' eliminada!'
    });
    console.log('resultado', result);
  }).catch(error => {
    res.status(400).json(error);
  });
})

//Create table
router.post('/create/:database/:table', (req, res) => {
  company.createTable(req.params.database, req.params.table).then(result => {
    res.send({
      result: result,
      status: 200,
      message: 'Tabla ' + `'` + req.params.table + `'` +' creada con exito!'
    });
    console.log('resultado', result);
  }).catch(error =>{
    res.status(400).json(error);
  });
});

//Create Company
router.post('/createCompany/:database/:table', (req, res) =>{

  const today = new Date();
  var empresa_created_at = today;

  company.create(req.params.database, req.params.table, req.body.empresa_des, req.body.empresa_direccion, req.body.empresa_contacto, req.body.empresa_ciudad, req.body.empresa_telefono, req.body.empresa_rif, req.body.empresa_telefax, req.body.empresa_email, req.body.empresa_website, req.body.empresa_status, req.body.empresa_fecha_inicio, req.body.empresa_fecha_fin, req.body.empresa_separador_pc, req.body.empresa_mascara_pc, req.body.empresa_simbolo, req.body.empresa_fecha_mov, req.body.empresa_centros_costos, req.body.empresa_correlativo, req.body.empresa_num_lineas, req.body.empresa_separador_cc, req.body.empresa_mascara_cc, empresa_created_at).then(result => {
     res.send({
      result: result,
      status: 200,
      message: 'Empresa ' + `'` + req.body.empresa_des + `'` + ' creada con exito!'
    });
    console.log('resultado', result);
  }).catch(error => {
    res.status(400).json(error);
  });
});

//Delete Company
router.delete('/delete/:database/:table', (req, res) =>{

  company.delete(req.params.database, req.params.table).then(result =>{
    res.send({
      result: result,
      status: 200,
      message: 'Empresa eliminada!'
    });
    console.log('resultado', result);
  }).catch(error => {
    res.status(400).json(error);
  });
});

//Update Company

router.put('/:database/:table', (req, res) =>{

  const today = new Date();
  var empresa_created_at = today;

  company.update(req.params.database, req.params.table, req.body.empresa_des, req.body.empresa_direccion, req.body.empresa_contacto, req.body.empresa_ciudad, req.body.empresa_telefono, req.body.empresa_rif, req.body.empresa_telefax, req.body.empresa_email, req.body.empresa_website, req.body.empresa_status, req.body.empresa_fecha_inicio, req.body.empresa_fecha_fin, req.body.empresa_separador_pc, req.body.empresa_mascara_pc, req.body.empresa_simbolo, req.body.empresa_fecha_mov, req.body.empresa_centros_costos, req.body.empresa_correlativo, req.body.empresa_num_lineas, req.body.empresa_separador_cc, req.body.empresa_mascara_cc, empresa_created_at).then(result => {
    res.send({
      result: result,
      status: 200,
      message: 'Empresa ' + `'` + req.body.empresa_des + `'` + ' editada!'
    });
    console.log('resultado', result);
  }).catch(error => {
    res.status(400).json(error);
    console.log('resultado', error);
  });
});

//------------------------------------------------------------------------------

//Get Companies

router.get('/', function (req, res) {

  //var databaseName = req.body.db_name;
  var databaseName = 'empresa_01';
  var tableName = 'empresa_aa';

  connection.query('SELECT * FROM ??.??;', [databaseName, tableName], function (err, company) {
    if (!err) {
      res.status(200).json({
        company: company
      });
      console.log(company)
    } else {
      res.status(400).json(err);
    }
  });


});

//Create Databases

router.post('/createDB', function (req, res) {
  var DatabaseName = req.body.name;
  var TableName = 'empresa_aa';
  if (DatabaseName && typeof DatabaseName === 'string' && connection.query) {
    connection.query('CREATE DATABASE ?? ', [DatabaseName], function (err, result) {
      if (!err) {
        res.status(200).json({
          database: result
        });
        connection.query('CREATE TABLE ??.?? (`empresa_id` int(11) NOT NULL AUTO_INCREMENT, `empresa_cod` varchar(45) NOT NULL,`empresa_opt` varchar(45) NOT NULL , PRIMARY KEY(`empresa_id`)) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = latin1', [DatabaseName, TableName]);
      } else {
        res.status(400).json(err);
      }
    });
  }
});


module.exports = router;