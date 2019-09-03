const axios = require('axios');
const router = require('express').Router();

require('dotenv').config();
const GOOGLE_KEY = process.env.GOOGLE_KEY;

router.get('/', (req, res, next) => {
  res.send({'message': 'Hello from location route'});
});

module.exports = router;
