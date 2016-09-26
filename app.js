'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware to show api requests in console

const images = require('./routes/images');
const galleries = require('./routes/galleries');
const auth = require('./routes/auth');
const errorhandler = require('./errorhandler');
const path = require('path');
const publicPath = path.resolve( __dirname, './public' );
const indexHtml = path.resolve( __dirname, './index.html' );
const authCheck = require('./authCheck');
const cors = require('./cors')('*');

module.exports = app
.use(morgan('dev'))
.use(express.static(publicPath))
.use(cors)
.get('/', (req,res) => res.sendFile(indexHtml))

.use('/api/auth', auth)
.use('/api/images', authCheck, images)
.use('/api/galleries', authCheck, galleries)
.use(errorhandler)
;
