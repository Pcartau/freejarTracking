const User = require('../dbSchema/User.js');

async function findOrCreate(userId, userName) {
  const user = await User.findOne({ userId });
  if (user) return user;
  return new User({
    userId,
    userName,
  }).save()
    .then((newUser) => newUser)
    .catch((e) => { throw new Error(e); });
}

async function findById(userId) {
  return User.findOne({ userId });
}

module.exports = {
  findOrCreate,
  findById,
};
