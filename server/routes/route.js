const express = require("express");
const route = express.Router();
const { User } = require("../models/model");
const { default: passport, initializePassport } = require("../passport/passport");
const expressSession = require('express-session');
const { urlencoded } = require("express");


initializePassport(passport);
route.use(express.urlencoded({extended:true}));
route.use(expressSession({secret: "secret"}));
route.use(express.json())
route.use(passport.initialize());
route.use(passport.session());


route.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
route.get('/login',(req,res)=>{
    return res.render("login");
})
route.post("/register", async (req, res) => {
  try {
    const newuser = await User.findOne({ username: req.body.username });

    if (newuser) {
      return res.status(200).send("User Already Exist");
    }

    const data = new User(newuser);
    const savedata = await data.save();
    res.json(savedata);
  } catch (error) {
    res.status(400).send(error);
  }
});

route.get('/register',(req,res)=>{
    return res.render("register");
})