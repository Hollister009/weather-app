const axios = require('axios');
const router = require('express').Router();

require('dotenv').config();
const DARK_SKY = process.env.DARK_SKY;

router.get('/', (req, res, next) => {
  res.send({'message': 'Hello from weather route'});
});

module.exports = router;
