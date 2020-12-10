const express = require('express');
const router = express.Router();

router.post('/signin', async (req, res) => {
  res.status(200).send('signin');
});

router.post('/signout', async (req, res) => {
  res.status(200).send('signout');
});

module.exports = router;