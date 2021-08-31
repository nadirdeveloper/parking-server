module.exports = function (app) {
    const { Router } = require('express');
    const router = Router();
    
    // Login API Route
    router.post("/login", (req, res) => {
        console.log("body", req.body);
        res.json({ success: true, message: "Successfully Logged In" })
    });

    // Signup API Route
    router.post("/signup", (req, res) => {
        console.log("body", req.body);
        res.json({ success: true, message: "Successfully Created User Account" });
    });

    app.use('auth', router)
}