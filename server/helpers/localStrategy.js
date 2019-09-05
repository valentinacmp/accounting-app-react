let User = require('./../helpers/models/user');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
  usernameField: 'user_username',
  passwordField: 'user_password'
}, function (user_username, user_password, done) {
  console.log("LocalStrategy called");
  console.log(user_username, user_password);

  User.getUserByName(user_username).then(user => {
    var userObj = JSON.stringify(user)
    var parseObj = JSON.parse(userObj)

    if (parseObj[0].clave === user_password){
      console.log('Macth')
      //  console.log(parseObj[0]);
      return done(null, parseObj[0]);
    } else {
      console.log('Doesnt Macth')
      return done(null, false);
    }
  }).catch((err) => {
    return done(null, false);
  });
});

