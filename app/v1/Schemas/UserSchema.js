const Joi = require('joi');

const user = {
  _id: Joi.string().uuid(),
  name: Joi.string().min(3),
  lastName: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
};

const UserGetSchema = Joi.object({
  id: user._id.required(),
});

const UserCreateSchema = Joi.object({
  name: user.name.required(),
  lastName: user.lastName.required(),
  email: user.email.required(),
  password: user.password.required(),
});

const UserUpdateSchema = Joi.object({
  name: user.name,
  lastName: user.lastName,
  email: user.email,
});

const UserDeleteSchema = Joi.object({
  id: user._id.required(),
});

module.exports = {
  UserSchema: {
    get: UserGetSchema,
    create: UserCreateSchema,
    update: UserUpdateSchema,
    delete: UserDeleteSchema,
  },
};