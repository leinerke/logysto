const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { UserModel } = require('../Models/UserModel');
const { AuthModel } = require('../Models/AuthModel');

class UserController {
  static async index(req, res, next) {
    try {
      const users = await UserModel.paginate({}, {
        sort: 'field -createdAt',
      });
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  static async store(req, res, next) {
    try {
      const userData = {};
      if (req.body.name) userData.name = req.body.name;
      if (req.body.lastName) userData.lastName = req.body.name;
      if (req.body.email) userData.email = req.body.email;
      const emailRegistered = await UserModel.findOne({ email: userData.email });
      if (emailRegistered) {
        throw boom.conflict('This email is already registered');
      }
      const user = await new UserModel(userData).save();

      const authData = {};
      if (user._id) authData.userId = user._id;
      if (req.body.email) authData.username = req.body.email;
      if (req.body.password) authData.password = await bcrypt.hash(req.body.password, 10);
      await new AuthModel(authData).save();

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  static async show(req, res, next) {
    try {
      const user = await UserModel.findById(req.params.id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const userData = {};
      if (req.body.name) userData.name = req.body.name;
      if (req.body.lastName) userData.lastName = req.body.name;
      if (req.body.email) userData.email = req.body.email;
      const user = await UserModel.findByIdAndUpdate(req.params.id, userData, {
          new: true,
          runValidators: true,
        },
      );

      const authData = {};
      if (req.body.email) authData.username = req.body.email;
      if (req.body.password) authData.password = await bcrypt.hash(req.body.password, 10);
      await AuthModel.findOneAndUpdate({ userId: user._id }, authData);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  static async destroy(req, res, next) {
    try {
      const user = await UserModel.findByIdAndRemove(req.params.id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = { UserController };