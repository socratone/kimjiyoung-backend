const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { query } = require('../database/model');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // email과 password에 일치하는 user를 찾는다.
  const sql = `
    SELECT id, email, name, account 
    FROM user WHERE email = ? AND password = ?`;
  
  try {
    const results = await query(sql, [email, password]);

    if (results.length !== 1) {
      return res.status(404).send({ message: '아이디나 비밀번호가 틀렸습니다.' });
    }
    
    const token = jwt.sign(JSON.stringify(results[0]), process.env.JWT_SECRET);
    res.status(200).send({ message: '로그인에 성공했습니다.', token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;