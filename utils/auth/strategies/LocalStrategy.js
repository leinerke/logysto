const { Strategy } = require('passport-local');
const { AuthController } = require('../../../app/v1/Controllers/AuthController');

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await AuthController.getUser(email, password);
    done(null, user);
  } catch (e) {
    done(e, false);
  }
});

module.exports = { LocalStrategy };