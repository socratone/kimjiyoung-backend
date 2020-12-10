const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  // email과 password에 일치하는 user를 찾는다.
  const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (error, results, fields) => {
    if (error) return res.status(500).send(error.message);
    if (results.length < 1) return res.status(404).send('아이디나 비밀번호가 틀렸습니다.');

    const token = jwt.sign({ email: 1, name: 'kimjiyoung' }, 'secretKey');
    res.header('x-auth-token', token).status(200).send('ok');
  });
});

module.exports = router;