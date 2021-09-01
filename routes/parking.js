module.exports = function (app) {
    const { Router } = require('express');
    const router = Router();

    // Get All Areas For Parking
    router.post("/getParkingAreas", app.controllers.GetParkingController);

    // Get All Slots For Parking at Area
    router.post("/getAllSlots", app.controllers.GetSlotsController)
    
    app.use("/parking", router)
}