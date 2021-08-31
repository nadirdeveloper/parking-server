const { SignupController } = require('../controllers/UserController');

module.exports = function (app) {
    const { Router } = require('express');
    const router = Router();
    
    // Login API Route
    router.post("/login", LoginController);

    // Signup API Route
    router.post("/signup", SignupController);

    app.use('auth', router)
}