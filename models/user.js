'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const user = new Schema({
  name: String,
  email: String,
  password: String,
}, { timestamps: true });

user.methods.generateHash = function(password){
  return this.password = bcrypt.hashSync(password, 8);
};

user.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', user);
