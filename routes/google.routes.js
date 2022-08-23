const router = require("express").Router();
const passport = require("passport");
const path = require("path");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Scope specifies which user's Google information that you want your app to get access to
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: '/auth/login', failureMessage: true }),
    (req, res) => {
      req.session.user=req.user;
      res.redirect('/');
    });


module.exports = router;