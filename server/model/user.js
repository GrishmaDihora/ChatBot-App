const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: String
}, { collection : 'user' });

const User = mongoose.model('User', userSchema);

module.exports = User;