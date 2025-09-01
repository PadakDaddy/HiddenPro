function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don't have permission" });
    }

    next(); // 역할이 허용되면 다음 미들웨어로 진행
  };
}

module.exports = authorizeRoles;
