const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const generateJWT = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
      hasPassword: user.hasPassword,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const googleAuthCallback = (req, res, next) => { 
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    async (err, user, info) => {
      if (err || !user) {
        return res.redirect("/login");
      }

      try {
        let existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          if (!existingUser.googleId) {
            existingUser.googleId = user.id;
            await existingUser.save();
          }

          const token = generateJWT(existingUser);
          res.cookie("token", token, { httpOnly: false });

          if (!existingUser.hasPassword) {
            return res.redirect("https://final-project-five-olive.vercel.app/set-password");
          } else {
            return res.redirect("https://final-project-five-olive.vercel.app/");
          }
        } else {
          const newUser = new User({
            googleId: user.id,
            username: user.displayName,
            email: user.email,
            role: "user",
            hasPassword: false,
          });

          await newUser.save();
          const token = generateJWT(newUser);
          res.cookie("token", token, { httpOnly: false });

          return res.redirect("https://final-project-five-olive.vercel.app/set-password");
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  )(req, res, next);
};

const facebookAuthCallback = (req, res, next) => {
  passport.authenticate(
    "facebook",
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        return res.redirect("https://final-project-five-olive.vercel.app/login");
      }

      try {
        let existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          if (!existingUser.facebookId) {
            existingUser.facebookId = user.facebookId;
            await existingUser.save();
          }

          const token = generateJWT(existingUser);
          res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "Lax",
          });

          if (!existingUser.hasPassword) {
            return res.redirect("https://final-project-five-olive.vercel.app/set-password");
          } else {
            return res.redirect("https://final-project-five-olive.vercel.app/");
          }
        } else {
          const newUser = new User({
            facebookId: user.facebookId,
            email: user.email,
            username: user.username,
            profilePicture: user.profilePicture,
            role: "user",
            hasPassword: false,
          });

          await newUser.save();
          const token = generateJWT(newUser);
          res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "Lax",
          });

          return res.redirect("https://final-project-five-olive.vercel.app/set-password");
        }
      } catch (error) {
        console.error("Facebook auth callback error:", error);
        return res.status(500).json({ error: error.message });
      }
    }
  )(req, res, next);
};

const loginWithGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
  failureRedirect: "/login",
  prompt: "select_account",
});
const loginWithFacebook = passport.authenticate("facebook", {
  failureRedirect: "/login",
  scope: ["email"],
});

module.exports = {
  googleAuthCallback,
  facebookAuthCallback,
  loginWithGoogle,
  loginWithFacebook,
};
