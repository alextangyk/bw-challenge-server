const axios = require('axios');
const express = require('express');
const topics = require('./topics');
const {StatusCodes} = require('http-status-codes');

const router = express.Router();

router.use('/api/topics', topics);

router.use((err, req, res, next) => {
  // handle error
  console.error(`Error in ${req.method} ${req.path} `, err);

  let message = 'Unknown Error';
  if (axios.isAxiosError(err) || typeof err.message === 'string') {
    message = err.message;
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(JSON.stringify({message}));
  next();
});

module.exports = router;
