module.exports = function (app, mongoose) {
    const { Router } = require('express');
    const router = Router();
    // Get All Statistics For Admin Dashboard
    router.get("/dashboard", app.controllers.DashboardController);
    router.post("/addUser", app.controllers.AddUserController);
    router.post("/createArea", app.controllers.CreateAreaController);
    router.get("/getAllAreas", app.controllers.GetAreaController);
    router.get("/getAllBookings", app.controllers.GetAreaController);
    router.get("/getAllParkings", app.controllers.GetAreaController);
    router.get("/getAllFeedbacks", app.controllers.GetAreaController);
    router.get("/getAllUsers", app.controllers.GetUsersController);
    router.delete("/deleteUser", app.controllers.DeleteUserController)
    app.use('/admin', router);
}