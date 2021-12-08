const express = require('express');
const {StatusCodes} = require('http-status-codes');
const topicsController = require('../controllers/topics');

const router = express.Router();

router.get('/', (req, res, next) => {
  topicsController.getTopics(req, res)
    .then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.status(StatusCodes.OK).end(JSON.stringify(result));
    })
    .catch(next);
});

module.exports = router;

