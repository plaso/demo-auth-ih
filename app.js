const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const { sessionConfig, loggedUser } = require('./config/session.config')

const router = require('./config/routes.config');
require('./config/db.config');
require('./config/hbs.config');

const app = express();

app.use(logger('dev')); // logger de morgan para ver las peticiones que se hacen
app.use(express.json()); // para que el body de las peticiones se pueda leer y ver en terminal
app.use(express.urlencoded({ extended: true })); // para que el body de las peticiones se pueda leer

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/** Configure static files */
app.use(express.static("public"));

// Session middleware
app.use(sessionConfig);
app.use(loggedUser); // req.currentUser = undefined || user en session

/** Router **/
app.use('/', router)

/**
 * Error Middlewares
 */

app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

app.use((error, req, res, next) => {
  console.log(error)
  let status = error.status || 500;

  res.status(status).render('error', {
    message: error.message,
    error: req.app.get('env') === 'development' ? error : {}
  })
})

app.listen(3000, () => console.log('App listening on port 3000!'));