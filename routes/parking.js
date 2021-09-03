module.exports = function (app) {
    const { Router } = require('express');
    const router = Router();

    // Get All Areas For Parking
    router.get("/getParkingAreas", app.controllers.GetParkingAreas);

    // Get All Slots For Parking at Area
    router.post("/getAllSlots", app.controllers.GetParkingSlots)
    
    // Book Parking Slot
    router.post("/bookParkingSlot", app.controllers.BookParkingSlot);
    
    app.use("/parking", router)
}