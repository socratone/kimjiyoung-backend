const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { query } = require('../database/model');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // email과 password에 일치하는 user를 찾는다.
  const sql = `
    SELECT id, email, name, admin 
    FROM user WHERE email = ? AND password = ?`;
  
  try {
    const results = await query(sql, [email, password]);
    if (results.length !== 1) return res.status(404).send('아이디나 비밀번호가 틀렸습니다.');
    
    const token = jwt.sign(JSON.stringify(results[0]), process.env.JWT_SECRET);
    res.header('x-auth-token', token).status(200).send('ok');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;