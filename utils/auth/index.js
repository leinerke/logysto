const passport = require('passport');
const { LocalStrategy } = require('./strategies/LocalStrategy');
const { JwtStrategy } = require('./strategies/TokenStrategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);