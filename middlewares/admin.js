const jwt = require("jsonwebtoken");
exports.adminFunc = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(user);
        if (err) return res.sendStatus(403);
        if (user.role !== "admin") return res.json({ success: false, message:'Sorry, You are not authorized to this section'});
        req.user = user;
        next();
    });
};