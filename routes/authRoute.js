const express = require("express");
const passport = require("../middleware/passport");
const passport2 = require("../middleware/passport2");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get('/github',
  passport2.authenticate('github'));

router.get('/github/callback', 
  passport2.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect dashboard.
    res.redirect('/dashboard');
  });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
