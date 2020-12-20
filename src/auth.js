const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token'); // 클라이언트에서 헤더로 보낸 토큰을 받는다.
  if (!token) return res.status(401).send('토큰이 없습니다.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 디코딩이 잘 되면 user 객체에 담아 다음으로 넘겨준다.
    next();
  } catch (error) {
    res.status(400).send({ 
      error: { 
        message: `토큰이 만료 됐거나 잘못됐습니다. 다시 로그인 해주세요.`
      }
    });
  }
}

module.exports = auth;