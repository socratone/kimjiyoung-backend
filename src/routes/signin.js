const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { query } = require('../database/model');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // email과 password에 일치하는 user를 찾는다.
  const sql = `
    SELECT id, email, password, name, account 
    FROM user WHERE email = ?`;
  
  try {
    const results = await query(sql, [email]);
    if (results.length !== 1) {
      return res.status(400).send({ message: '가입하지 않은 사용자입니다.' });
    }
    
    const isSame = await bcrypt.compare(password, results[0].password);
    if (!isSame) {
      return res.status(400).send({ message: '아이디나 비밀번호가 틀렸습니다.' });
    }

    const user = { 
      id: results[0].id, 
      email: results[0].email, 
      name: results[0].name, 
      account: results[0].account 
    };

    const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
    res.status(200).send({ message: '로그인에 성공했습니다.', token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;