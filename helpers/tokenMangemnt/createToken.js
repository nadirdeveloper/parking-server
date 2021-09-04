const jwt = require("jsonwebtoken")
const createToken = async (user, salt) => {
    const token = jwt.sign({ user: user.userId, email: user.email,role: user.role }, salt).toString();
    return token
}
module.exports = { createToken };