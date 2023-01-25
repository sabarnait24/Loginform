const db = require('../models/db');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const validator = require("validator");

const user = new mongoose.Schema({
   name:{
    type: String,
    required : true,
   },
   password:{
    type: String,
    required : true,
   }
  
})

const User=mongoose.model('user',user);
module.exports={
 User
}
