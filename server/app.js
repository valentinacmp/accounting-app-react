const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const config = require('./helpers/config/config');
var methodOverride = require('method-override');
let passport = require('passport');
var session = require('express-session');
var cookieParser = require("cookie-parser");

// app.use(cookieParser());

// app.use(express.static("/client/public/index.html"));
app.use(express.json({
  limit: "mb"
}));
app.use(methodOverride());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
    credentials: true
  })
);

app.get("/", function(req, res) {
  // res.sendFile(__dirname + "/public/index.html");
  res.status(200).send("Hello World!")
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// required for passport

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

app.use(cookieParser());
app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: expiryDate
      // maxAge: 60 * 60 * 1000
    }
  })
); // session secret

app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes"));

app.use(function (err, req, res, next) {
  console.log("Erro app.js token", err);
  if (err.name === 'UnauthorizedError') { //token no es valido o hubo un error en la firma o token no existe
    res.status(401).send({
      message: 'invalid token...',
      status: 401
    });
  }
});

app.use(function (req, res, next) {
  var cookie = req.cookies.jwtToken;
  if (!cookie) {
    res.cookie('jwtToken', theJwtTokenValue, { maxAge: 900000, httpOnly: true });
    console.log("here");
  } else {
    console.log('lets check that this is a valid cookie');
    // send cookie along to the validation functions...
  }
  next();
});

passport.use(require('./helpers/localStrategy'));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Create a Server
const server = app.listen(3001, "0.0.0.0", function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

// const io = require("socket.io").listen(server);
// io.connect("192.168.0.116:8080");