'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const image = new Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Image', image);
