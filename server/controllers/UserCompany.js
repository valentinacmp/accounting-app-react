const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth');
const jwt = require('jsonwebtoken');

let props = require('./../helpers/props/properties');
let config = require('./../helpers/config/config');
let router = express.Router();
let company = require('./../helpers/models/userCompany.js');

let cors = require('cors');
router.use(cors());

router.get('/', function (req, res) {
  company.getCompanies().then(result => {
    res.send({
      result: result,
      status: 200
    });
  }).catch(error => {
    res.status(400).json(error);
  })
});

router.get('/sucursal/:company', function (req, res) {
  company.getSucursal(req.params.company).then(result => {
    res.send({
      result: result,
      status: 200
    });
  }).catch(error => {
    res.status(400).json(error);
  })
});


router.post('/company', function (req, res) {

  company.createCompany(req.body.company_rif, req.body.company_name, req.body.company_rif, req.body.company_days, req.body.company_start_date, req.body.company_end_date, req.body.company_status).then(result => {
    res.send({
      result: result,
      status: 200
    });
  }).catch(error => {
    res.status(400).json(error);
  })
})

router.post('/sucursal/:company_rif', function (req, res) {

  company.createSucursal(req.params.company_rif, req.body.sucursal, req.body.sucursal_name, req.body.sucursal_status).then(result => {
    res.send({
      result: result,
      status: 200
    });
  }).catch(error => {
    res.status(400).json(error);
  })

})

module.exports = router;