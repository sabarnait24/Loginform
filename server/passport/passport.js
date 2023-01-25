import passport from 'passport';
var passport = require("passport");
const { initialize } = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/model");
 const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, cb)=> {
      try {
        const existuser = await User.findOne({ username });

        if (!existuser) {
          return cb(null, false);
        }
        if (password !== existuser.password) {
          return cb(null, false);
        }
        return cb(null, existuser);
      } catch (error) {
        return cb(error, false);
      }
    })
  );

  passport.serializeUser((existuser, cb) => {
    cb(null, existuser.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
      const existuser = await User.findById(id);
      cb(null, existuser);
    } catch (error) {
      cb(error, false);
    }
  });
};

module.exports={
  initializePassport
}
