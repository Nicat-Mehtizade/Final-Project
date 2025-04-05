const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "http://localhost:5173/register"
}))

router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.send("Error logging out");
      res.redirect("http://localhost:5173/login");
    });
  });

  router.get("/user", (req, res) => {
    res.send(req.user);
  });

  export default router;