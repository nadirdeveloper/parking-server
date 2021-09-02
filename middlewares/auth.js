const jwt = require("jsonwebtoken");
exports.authFunc = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_ACC_ACTIVATE, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};