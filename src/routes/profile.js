const express = require('express');
const router = express.Router();
const auth = require('../auth');
const { query } = require('../database/model');

router.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM profile ORDER BY sort, id';
    const results = await query(sql);

    const profile = { 
      firstItem: {},
      secondItem: {},
      thirdItem: {},
      items: [],
    };

    for (let i = 0; i < results.length; i++) {
      if (!results[i].image) {
        profile.items.push(results[i]);
      } else if (results[i].image === 'first-item.png') {
        profile.firstItem['text'] = results[i].word;
      } else if (results[i].image === 'second-item.png') {
        profile.secondItem['text'] = results[i].word;
      } else if (results[i].image === 'third-item.png') {
        profile.thirdItem['text'] = results[i].word;
      }
    }

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }}); // 그냥 error는 안 보내진다.
  }
});

router.put('/', auth, async (req, res) => {
  try {
    let { image, text } = req.body;
    const sql = 'UPDATE profile SET word = ? WHERE image = ?';
    const results = await query(sql, [text, image]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;