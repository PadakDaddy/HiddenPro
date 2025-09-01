const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key"; // user.js와 같은 비밀키를 사용하세요

function authenticateToken(req, res, next) {
  // 클라이언트가 보낸 Authorization 헤더에서 토큰 추출
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <토큰>" 에서 토큰 부분만 분리

  if (!token) return res.status(401).json({ error: "Token required" });

  // 토큰 검증
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user; // 토큰에서 추출한 사용자 정보 저장
    next(); // 다음 미들웨어나 라우트로 진행
  });
}

module.exports = authenticateToken;
