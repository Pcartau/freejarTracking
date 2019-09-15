const User = require('../dbSchema/User.js');

async function findOrCreate(userId) {
  const user = await User.findOne({ userId });
  if (user) return user;
  return new User({
    userId,
    userName: 'Meh',
  }).save()
    .then((newUser) => newUser)
    .catch((e) => { throw new Error(e); });
}

module.exports = findOrCreate;
