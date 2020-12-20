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
    const users = await query(sql, [email]);
    if (users.length !== 1) {
      return res.status(400).send({ error: { message: '가입하지 않은 사용자입니다.' }});
    }
    
    const isSame = await bcrypt.compare(password, users[0].password);
    if (!isSame) {
      return res.status(400).send({ error: { message: '아이디나 비밀번호가 틀렸습니다.' }});
    }

    const user = { 
      id: users[0].id, 
      email: users[0].email, 
      name: users[0].name, 
      account: users[0].account 
    };

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 1시간 * 24시간 * 7시간
        data: JSON.stringify(user)
      }, 
      process.env.JWT_SECRET
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;