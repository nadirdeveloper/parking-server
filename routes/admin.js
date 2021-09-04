const { adminFunc } = require('../middlewares/admin');
const { authFunc } = require('../middlewares/auth');

module.exports = function (app, mongoose) {
    const { Router } = require('express');
    const router = Router();
    // Get All Statistics For Admin Dashboard
    router.get("/dashboard", adminFunc, app.controllers.DashboardController);
    // Add User To Database
    router.post("/addUser", adminFunc, app.controllers.AddUserController);
    // Create Parking Area
    router.post("/createArea", adminFunc, app.controllers.CreateAreaController);
    // Get All Parking Areas
    router.get("/getAllAreas", authFunc, app.controllers.GetAreaController);
    // Get All Bookings
    router.get("/getAllBookings", adminFunc, app.controllers.GetBookingController);
    router.get("/getAllParkings", adminFunc, app.controllers.GetParkingController);
    router.get("/getAllFeedbacks", adminFunc, app.controllers.GetFeedbackController);
    router.get("/getAllUsers", adminFunc, app.controllers.GetUsersController);
    router.delete("/deleteUser", adminFunc, app.controllers.DeleteUserController);
    router.delete("/deleteArea", adminFunc, app.controllers.DeleteAreaController);
    router.post("/deleteBooking", adminFunc, app.controllers.DeleteBookingController);
    router.post("/deleteParking", adminFunc, app.controllers.DeleteParkingController);
    router.post("/cancelBooking", adminFunc, app.controllers.CancelBookingController);
    router.post("/changeUserRole", adminFunc, app.controllers.ChangeRoleController);
    router.post("/replyFeedback", adminFunc, app.controllers.ReplyFeedbackController);
    app.use('/admin', router);
}