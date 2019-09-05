var mysql = require('mysql');
const props = require('./../props/properties.js');

var connection = mysql.createConnection({
  host: props.host,
  user: props.user,
  password: props.password
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;

