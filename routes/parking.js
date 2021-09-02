module.exports = function (app) {
    const { Router } = require('express');
    const router = Router();

    // Get All Areas For Parking
    router.get("/getParkingAreas", app.controllers.GetParkingAreas);

    // Get All Slots For Parking at Area
    router.get("/getAllSlots", app.controllers.GetParkingSlots)
    
    // 
    
    app.use("/parking", router)
}