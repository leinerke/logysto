const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  recoveryToken: {
    type: String,
    default: null,
  },
}, { timestamps: true });

const AuthModel = mongoose.model('Auth', AuthSchema);
module.exports = { AuthModel };