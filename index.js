const { config } = require('./config');
const express = require('express');
const cors = require('cors');
const { routerV1 } = require('./routes/v1');
const db = require('./db');
const { error } = require('./middleware/error');

const app = express();
const dbUrl = `mongodb://${config.db.USER}:${config.db.PASS}@${config.db.HOST}/${config.db.DB}`;

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */
routerV1(app);

/**
 * Errors Handlers
 */
app.use(error.logErrors);
app.use(error.dbErrorHandler);
app.use(error.boomErrorHandler);
app.use(error.errorHandler);

app.listen(config.app.PORT, () => {
  console.log(`${config.app.NAME} esta corriendo en ${config.app.URL}`);
  db.connect(dbUrl);
});