const database = require("../models/userModel").database;
const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};
const findOrCreate = (gitUser, callback) => {
  try {
    let user = database.find((user) => {user.id == gitUser.githubId});
    if (user) {
      callback(null, user);
    } else {
      let newGitUser = {
        id: gitUser.githubId,
        name: gitUser.githubName,
        email: null,
        password: null,
      };
      database.push(newGitUser);
      callback(null, newGitUser);
    };
  } catch (err) {
    callback(err, null)
  }
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};
