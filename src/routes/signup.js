const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../database/model');

router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const sql = 'SELECT email FROM user WHERE email = ?';
    const results = await query(sql, [email]);
    if (results.length > 0) {
      return res.status(403).send({ message: '이미 사용하고 있는 이메일입니다.'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
  
    const sql2 = 'INSERT INTO user (email, password, name) VALUES (?, ?, ?)';
    const results2 = await query(sql2, [email, hashed, name]);
    if (results2.affectedRows === 1) {
      res.status(200).send({ message: `${email}이라는 아이디를 생성했습니다.`});
    } else {
      res.status(500).send({ message: '아이디를 생성하지 못했습니다.'});
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;