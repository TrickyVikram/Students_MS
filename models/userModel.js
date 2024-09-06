const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  password: String // This will be populated only for local signups
});

const User = mongoose.model('User', userSchema);
module.exports = User;



