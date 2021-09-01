const { GenerateUniqueId } = require('../helpers/uniqueId');

module.exports = function (app, mongoose) {
    const { Area, Parking } = app.db.models;
    const { Validator: { AdminValidator: { AreaSchema } } } = require('../helpers');

    // Dashboard Controller for Dashboard Route
    const DashboardController = async (req, res) => {
        try {

        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    };
    // Create Area Controller for Admin Route
    const CreateAreaController = async (req, res) => {
        try {
            const validation = AreaSchema.validate(req.body);
            if (validation.error) {
                throw new Error(validation.error);
            }
            const { areaName, parkingSpace } = req.body;
            const areaId = GenerateUniqueId();
            const existingArea = await Area.findOne({ name: areaName });
            if (existingArea) {
                return res.json({ success: false, message: "This Area Name already exist" })
            };
            let newArea = new Area({
                id: areaId,
                name: areaName,
                totalPakringSpace: parkingSpace,
                createdBy: 'Admin'
            });
            newArea.save((err, success) => {
                if (err) {
                    console.log("Error Saving The Record ", err);
                    return res.json({ success: false, message: 'Error Saving The Record', err })
                }
                const parkingSlots = []
                for (let i = 0; i < parkingSpace; i++) {
                    let newParkingSlot = {
                        id: GenerateUniqueId(),
                        name:  "Slot " + (i + 1),
                        areaId: areaId,
                        startTime: null,
                        endTime: null,
                        lastUser: null,
                        isBooked: false
                    };
                    parkingSlots.push(newParkingSlot);
                };
                console.log(parkingSlots);
                Parking.insertMany([...parkingSlots]).then(() => {
                    res.json({ success: true, message: 'Successfully Created Area With Slots',newArea })
                }).catch((error) => {
                    if (error) {
                        console.log(error)
                        res.json({ success: false, message: 'Error Creating Slots for Parking' });
                    }
                })
            })
        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }
    // Get All Areas Controlle for Admin Route
    const GetAreaController = async (req, res) => {
        try {

        } catch (error) {
            if (error) {

            }
        }
    }
    // Configuring Admin Controllers to app
    app.controllers.DashboardController = DashboardController;
    app.controllers.CreateAreaController = CreateAreaController;
    app.controllers.GetAreaController = GetAreaController;
}