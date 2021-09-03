const { GenerateUniqueId } = require("../helpers/uniqueId");

module.exports = function (app, mongooose) {
    const { Area, Parking, Booking } = app.db.models;
    const GetParkingAreas = async (req, res) => {
        try {
            const allAreas = await Area.find();
            res.json({ success: true, allAreas, message: "Successfully Found All Areas" });
        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }
    const GetParkingSlots = async (req, res) => {
        try {
            const { areaId, selectedStartTime, selectedEndTime, selectedDate } = req.body;
            const dataToCheck = {
                areaId,
                startTime: new Date(`${selectedDate} ${selectedStartTime}`).getTime(),
                endTime: new Date(`${selectedDate} ${selectedEndTime}`).getTime(),
            }
            const allParkings = await Parking.find({ areaId });
            let gotParkings = [];
            for (let i = 0; i < allParkings.length; i++) {
                let eachParking = allParkings[i];
                console.log({ startTime: dataToCheck.startTime, areaId, parkingId: eachParking.id, isBooking: true })
                const checkUnavailable = await Booking.find({ startTime: { $gte: dataToCheck.startTime }, endTime: { $lte: dataToCheck.endTime }, areaId, parkingId: eachParking.id, isBooking: true })
                console.log(checkUnavailable);
                if (checkUnavailable.length != 0) {
                    let newParking = { ...eachParking._doc, isAvailable: false }
                    gotParkings.push(newParking)
                } else {
                    let newParking = { ...eachParking._doc, isAvailable: true }
                    gotParkings.push(newParking)
                }
            }
            res.json({ success: true, allParkings: gotParkings, message: "Successfully found All Parkings" })
        } catch (error) {
            console.log(error)
            if (error) {
                res.json({ success: false, message: error.message });
            }
        }
    }

    const BookParkingSlot = async (req, res) => {
        try {
            const { areaId, selectedStartTime, selectedEndTime, selectedDate, parkingId } = req.body;
            const dataToSave = {
                id: GenerateUniqueId(),
                areaId,
                parkingId,
                startTime: new Date(`${selectedDate} ${selectedStartTime}`).getTime(),
                endTime: new Date(`${selectedDate} ${selectedEndTime}`).getTime(),
                isBooking: true
            }
            const newBooking = new Booking(dataToSave);
            let saveBooking = await newBooking.save();
            res.json({ success: true, message: "Successfully Saved Booking" })
        } catch (error) {
            console.log(error)
            if (error) {
                res.json({ success: false, message: error.message });
            }
        }
    }

    app.controllers.GetParkingAreas = GetParkingAreas;
    app.controllers.GetParkingSlots = GetParkingSlots;
    app.controllers.BookParkingSlot = BookParkingSlot;
}