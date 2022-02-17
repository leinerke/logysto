const { UserModel } = require('../Models/UserModel');

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
      const user = await new UserModel(req.body).save();
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
      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
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