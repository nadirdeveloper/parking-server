module.exports = function (app) {
    const { Router } = require('express');
    const { authFunc } = require('../middlewares/auth');
    const router = Router();

    // Get All Areas For Parking
    router.get("/getParkingAreas", authFunc, app.controllers.GetParkingAreas);

    // Get All Slots For Parking at Area
    router.post("/getAllSlots", authFunc, app.controllers.GetParkingSlots)

    // Book Parking Slot
    router.post("/bookParkingSlot", authFunc, app.controllers.BookParkingSlot);

    // Get Booking Parking Slots
    router.get("/getBookings", authFunc, app.controllers.GetUserBookings);

    // Get Booking Parking Slots
    router.post("/saveFeedback", authFunc, app.controllers.SaveFeedbackController);

    // Get Booking Parking Slots
    router.get("/getFeedback", authFunc, app.controllers.ViewFeedbackController);

    // Cancel Booking
    router.post("/cancelBooking", authFunc, app.controllers.CancelBookingController);


    app.use("/parking", router)
}