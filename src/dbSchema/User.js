const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  userName: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
