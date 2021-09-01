module.exports = function (app) {
    const { Router } = require('express');
    const router = Router();
    
    // Login API Route
    router.post("/login", app.controllers.LoginController);

    // Signup API Route
    router.post("/signup", app.controllers.SignupController);

    app.use('/auth', router)
}