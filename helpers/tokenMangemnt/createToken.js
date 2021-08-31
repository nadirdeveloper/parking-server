const jwt = require("jsonwebtoken")
const createToken = async (user, salt) => {
    const token = jwt.sign({ user: user._id, email: user.email }, salt).toString();
    return token
}
module.exports = { createToken };