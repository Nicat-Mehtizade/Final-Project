const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");
const User = require("../models/userSchema");
dotenv.config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          } else {
            user = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              username: profile.displayName,
              hasPassword: false,
              profilePicture: profile.photos[0].value,
              role: "user",
            });
            await user.save();
            return done(null, user);
          }
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "emails", "name", "photos"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            if (!user.facebookId) {
              user.facebookId = profile.id;
              await user.save();
            }
          } else {
            user = new User({
              facebookId: profile.id,
              email: profile.emails?.[0]?.value || "",
              username: profile.displayName || `${profile.name?.givenName ?? ""} ${profile.name?.familyName ?? ""}`,
              profilePicture: profile.photos?.[0]?.value ?? "",
              hasPassword: false,
              role: "user",
            });
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  

  passport.serializeUser((user, done) => {
    done(null, user._id); 
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); 
    } catch (err) {
      done(err, null);
    }
  });
  