'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallery = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallery);
