const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const userController = require("../controllers/userController");

const githubLogin = new GitHubStrategy({
  clientID: "dfa266b7a9ab46874ead",
  clientSecret: "6be5cf6e6d53d6a667ce0e884cd67ee1fc768faf",
  callbackURL: "http://localhost:8000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  userController.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(githubLogin);
