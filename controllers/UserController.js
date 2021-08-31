const LoginController = (req, res) => {
    console.log("body", req.body);
    res.json({ success: true, message: "Successfully Logged In" })
}
const SignupController = (req, res) => {
    console.log("body", req.body);
    res.json({ success: true, message: "Successfully Logged In" })
}
module.exports = { LoginController, SignupController }