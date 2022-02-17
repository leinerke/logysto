const env = require('dotenv').config().parsed;
const config = {
  app: {
    NAME: env.APP_NAME || 'API',
    ENV: env.APP_ENV || 'local',
    URL: env.APP_URL || 'http://localhost',
    PORT: env.APP_PORT || '3000',
    ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET || '',
    REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET || '',
  },
  db: {
    USER: env.MONGODB_USER || '',
    PASS: env.MONGODB_PASS || '',
    HOST: env.MONGODB_HOST || '',
    PORT: env.MONGODB_PORT || '',
    DB: env.MONGODB_DB || '',
  },
  geo: {
    google: {
      URL: env.API_GOOGLE_URL || '',
      KEY: env.API_GOOGLE_KEY || '',
    },
    tomtom: {
      URL: env.API_TOMTOM_UP || '',
      KEY: env.API_TOMTOM_KEY || '',
    },
  },
};

module.exports = { config };