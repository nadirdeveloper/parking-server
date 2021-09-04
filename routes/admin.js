module.exports = function (app, mongoose) {
    const { Router } = require('express');
    const router = Router();
    // Get All Statistics For Admin Dashboard
    router.get("/dashboard", app.controllers.DashboardController);
    router.post("/addUser", app.controllers.AddUserController);
    router.post("/createArea", app.controllers.CreateAreaController);
    router.get("/getAllAreas", app.controllers.GetAreaController);
    router.get("/getAllBookings", app.controllers.GetBookingController);
    router.get("/getAllParkings", app.controllers.GetParkingController);
    router.get("/getAllFeedbacks", app.controllers.GetFeedbackController);
    router.get("/getAllUsers", app.controllers.GetUsersController);
    router.delete("/deleteUser", app.controllers.DeleteUserController);
    router.delete("/deleteArea", app.controllers.DeleteAreaController);
    router.post("/deleteBooking", app.controllers.DeleteBookingController);
    router.post("/deleteParking", app.controllers.DeleteParkingController);
    router.post("/cancelBooking", app.controllers.CancelBookingController);
    router.post("/changeUserRole", app.controllers.ChangeRoleController);
    router.post("/replyFeedback", app.controllers.ReplyFeedbackController);
    app.use('/admin', router);
}