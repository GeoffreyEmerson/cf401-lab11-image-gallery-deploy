'use strict';

const express = require('express');
const router = express.Router();

const bodyparser = require('../bodyparser');
const authCheck = require('../authCheck');
const token = require('../token');

const User = require('../models/user');

module.exports = router

.post('/signup', bodyparser, (req, res) => {
  const {email, password, name} = req.body;
  delete req.body.password;

  if(!email || !password || !name) {
    return res.status(400).json({message: 'All fields are required.'});
  }

  User.findOne({email})
    .then( existing => {
      if(existing) return res.status(500).json({message: 'That email is already in use.'});
      const user = new User(req.body);
      user.generateHash(password);
      return user.save()
      .then( user => {
        return token.sign(user);
      })
      .then( token => {
        res.json({token});
      });
    })
    .catch( err => {
      console.log('error on user signup');
      console.log(err);
      next(err);
    });
})

.post('/login', bodyparser, (req, res) => {
  const {email, password} = req.body;
  delete req.body;

  User.findOne({email})
    .then(user => {
      if(!user || !user.compareHash(password)) return res.status(400).json({message: 'Invalid email or password.'});
      return token.sign(user)
      .then( token => {
        res.json({token});
      });
    })
    .catch( err => {
      console.log('error on user signin');
      console.log(err);
      next(err);
    });
})

.get('/verify', authCheck, (req, res) =>{
  res.status(200).send({success: true});
})

;
