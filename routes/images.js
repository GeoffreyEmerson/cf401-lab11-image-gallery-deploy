'use strict';

const express = require('express');
const router = express.Router();
const bodyparser = require('../bodyparser');
const Image = require('../models/image');

module.exports = router

.get('', (req,res,next) => {
  Image.find()
  .lean()
  .then( images => res.send(images) )
  .catch( err => {
    console.log('error getting full image list');
    console.log(err);
    next(err);
  });
})

.get('/count', (req,res,next) => {
  Image.find()
  .lean()
  .then( images => res.send(images) )
  .catch( err => {
    console.log('error getting image list length');
    console.log(err);
    next(err);
  });
})

.get('/:id', (req,res,next) => {
  Image.findById(req.params.id)
  .lean()
  .then( image => res.send(image) )
  .catch( err => {
    console.log('error getting an image by id');
    console.log(err);
    next(err);
  });
})

.post('', bodyparser, (req,res,next) => {
  new Image(req.body)
  .save()
  .then( image => res.send(image) )
  .catch( err => {
    console.log('error a new image');
    console.log(err);
    next(err);
  });
})

.delete('/:id', (req,res,next) => {
  Image.findByIdAndRemove(req.params.id)
  .lean()
  .then( deleted => res.send(deleted) )
  .catch( err => {
    console.log('error deleting an image by id');
    console.log(err);
    next(err);
  });
})

;
