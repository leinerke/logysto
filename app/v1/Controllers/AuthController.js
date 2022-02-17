const passport = require('passport');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('../../../config');
const { AuthModel } = require('../Models/AuthModel');
const { UserController } = require('./UserController');

class AuthController {

  static async register(req, res, next) {
    try {
      await UserController.store(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const user = req.user;
      const accessToken = await AuthController.accessToken(user);
      const refreshToken = await AuthController.refreshToken(user);
      await AuthModel.findByIdAndUpdate(user._id.toString(), { refreshToken }, { runValidators: true });
      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      const auth = await AuthModel.findOne({ refreshToken }).select('userId refreshToken');
      if (!auth || !auth.refreshToken === refreshToken) throw boom.unauthorized();
      const accessToken = await AuthController.accessToken(auth);
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(email, password) {
    const user = await AuthModel.findOne({ email }).select('_id password');
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    user.password = undefined;
    return user;
  }

  static async accessToken(user) {
    return await jwt.sign({ sub: user._id.toString() }, config.app.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  }

  static async refreshToken(user) {
    return await jwt.sign({ sub: user._id.toString() }, config.app.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
  }
}

module.exports = { AuthController };