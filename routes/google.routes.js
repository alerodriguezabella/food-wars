const router = require("express").Router();
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Scope specifies which user's Google information that you want your app to get access to
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login", // here you would redirect to the login page using traditional login approach
  })
);

router.get("/auth/profile", (req, res) => {
  if (!req.user) {
    res.redirect("/"); 
    return;
  }

  req.session.user=req.user;

  res.render("/");
});

module.exports = router;