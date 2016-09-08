'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware to show api requests in console

const images = require('./routes/images');
const galleries = require('./routes/galleries');
const errorhandler = require('./errorhandler');
const path = require('path');
const publicPath = path.resolve( __dirname, './public' );
const indexHtml = path.resolve( __dirname, './index.html' );

module.exports = app
.use(morgan('dev'))
.use(express.static(publicPath))
.get('/', (req,res) => res.sendFile(indexHtml))

.use( (req, res, next) => {
  const url = '*';
  res.header( 'Access-Control-Allow-Origin', url );
  res.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
  next();
})

.use('/api/images', images)
.use('/api/galleries', galleries)
.use(errorhandler)
;
