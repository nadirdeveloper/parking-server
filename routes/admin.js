module.exports = function (app, mongoose) {
    const { Router } = require('express');
    const router = Router();
    // Get All Statistics For Admin Dashboard
    router.post("/dashboard", app.controllers.DashboardController);
    router.post("/createArea",app.controllers.CreateAreaController);
    router.post("/getAllAreas",app.controllers.GetAreaController);
    app.use('/admin', router);
}