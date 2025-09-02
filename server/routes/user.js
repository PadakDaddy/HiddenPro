const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorize");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key"; // 절대 유출되면 안 됨

// Create (회원 생성)
// 회원가입 API
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. 유저 생성
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 3. JWT 토큰 생성
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. 리프레시 토큰 DB 저장
    await newUser.update({ refreshToken });

    // 5. 응답에 토큰과 함께 새 유저 정보 전달(비밀번호 제외)
    res.status(201).json({
      message: "User created and logged in",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read (모든 회원 조회)
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read (특정 회원 조회)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update (회원 정보 수정)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { username, email, password } = req.body;

    // 비밀번호가 전달된 경우 해시 처리
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // 업데이트할 값 준비
    const updatedData = {
      username,
      email,
    };
    if (hashedPassword) {
      updatedData.password = hashedPassword;
    }

    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete (회원 삭제)
// 예) 관리자만 회원 삭제 가능
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// 로그인 API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 리프레시 토큰을 DB에 저장
    await user.update({ refreshToken });
    // 로그인 성공 - 여기서는 간단히 user 정보 반환
    // 추후 JWT 토큰 발급 등 인증 기능 추가 가능
    res.json({ message: "Login successful", token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh Token required" });
  }

  const user = await User.findOne({ where: { refreshToken } });

  if (!user) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }

  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // 새 액세스 토큰 발급
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
});

module.exports = router;
