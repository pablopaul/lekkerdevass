var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieSession = require("cookie-session");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require("bcryptjs");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
      name: "session",
      // TODO (security): Get secret from env var
      secret: "SECRET",
      httpOnly: true
    })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/team.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db = require("./models");

(async () => {
  await db.sequelize.sync({force: true});

  try {
    await db.sequelize.authenticate();
    //console.log('Connection has been established successfully.');
  } catch (error) {
    //console.error('Unable to connect to the database:', error);
  }

  const jane = await db.user.create({
    name: 'janedoe',
    password: bcrypt.hashSync('password', 8),
    score: Math.floor(Math.random() * 1000) + 1
  });
  //console.log(jane.toJSON());

  const team = await db.team.create({
    name: 'team1',
    maxMembers: '20',
    ownerId: 1
  });
  //console.log(team.toJSON());

  await db.user.update({
    teamId: 1
  }, {
    where: {
      id: 1
    }
  });

})();

module.exports = app;
