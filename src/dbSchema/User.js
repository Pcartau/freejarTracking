const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  user_name: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
