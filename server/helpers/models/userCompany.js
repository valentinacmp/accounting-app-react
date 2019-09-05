const props = require('../props/properties.js');
const connection = require('../config/database.js');
const bcrypt = require('bcryptjs');

var Promise = require('promise');

module.exports = {

  getCompanies: function () {
   return new Promise ((res, rej) =>{
     connection.query(props.getAllCompanies, function (error, result) {
       if(!error){
         res(result);
       } else {
         rej(error);
         console.log(error);
       }
     })
   }) 
  },

  getSucursal: function (company) {
    return new Promise((res, rej) => {
      connection.query(props.getSucursal, [company], function (error, result) {
        if (!error) {
          res(result);
        } else {
          rej(error);
          console.log(error);
        }
      })
    })
  },

  createCompany: function (company, company_name, company_rif, company_days, company_start_date, company_end_date, company_status) {
    return new Promise ((res, rej) =>{
      connection.query(props.checkCompanyUser, [company], function (error, result) {
         if (result.length == 0) {
          connection.query(props.createCompanyUser, [company, company_name, company_rif, company_days, company_start_date, company_end_date, company_status], function (error, result) {
            if (!error) {
              res(result);
            } else {
              rej(error);
              console.log(error);
            }
          })
         } else {
           rej(error)
           console.log('Error: company exists', error)
         }
      })
    })
  },

  createSucursal: function (company, sucursal, sucursal_name, sucursal_status) {
    return new Promise((res, rej) =>{
     connection.query(props.checkSucursal, [company, sucursal], function (error, result) {
       if(result.length === 0){
          connection.query(props.createSucursal, [company, sucursal, sucursal_name, sucursal_status], function (error, result) {
            if (!error) {
              res(result);
            } else {
              rej(error);
              console.log(error);
            }
          })
       }else {
         rej(error)
         console.log('Error: la sucursal existe', error)
       }
     })
    })
  }

}