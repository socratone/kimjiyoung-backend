const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const PASSWORD = '11111111';

router.post('/', (req, res) => {
  const { id, password } = req.body;
  if (id !== 'kimjiyoung' || password !== PASSWORD) {
    return res.status(404).send('아이디나 비밀번호가 틀렸습니다.');
  }

  const token = jwt.sign({ id: 1, name: 'kimjiyoung' }, 'secretKey');
  res.header('x-auth-token', token).send('ok');
});

module.exports = router;