const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model('User', UserSchema);
module.exports = { UserModel };