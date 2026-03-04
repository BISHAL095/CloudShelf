const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { getUserByEmail, getUserById } = require("../services/userService");

module.exports = function (passport) {

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          
          if (!email || !password) {
            return done(null, false, { message: "Email and password required" });
          }

          const user = await getUserByEmail(email.trim().toLowerCase());

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const match = await bcrypt.compare(password, user.password);

          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);

        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Session serialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);

      if (!user) {
        return done(null, false);
      }
      done(null, user);

    } catch (err) {
      done(err);
    }
  });

};