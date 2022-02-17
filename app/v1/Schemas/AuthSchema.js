const Joi = require('joi');

const auth = {
  name: Joi.string().min(3),
  lastName: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
  refreshToken: Joi.string(),
};

const AuthRegisterSchema = Joi.object({
  name: auth.name.required(),
  lastName: auth.lastName.required(),
  email: auth.email.required(),
  password: auth.password.required(),
});

const AuthLoginSchema = Joi.object({
  email: auth.email.required(),
  password: auth.password.required(),
});

const AuthRefreshTokenSchema = Joi.object({
  refreshToken: auth.refreshToken.required(),
});

module.exports = {
  AuthSchema: {
    register: AuthRegisterSchema,
    login: AuthLoginSchema,
    refresh: AuthRefreshTokenSchema,
  },
};