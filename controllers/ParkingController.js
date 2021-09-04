const { GenerateUniqueId } = require("../helpers/uniqueId");

module.exports = function (app, mongoose) {
    const { Area, Parking, Booking, Feedback } = app.db.models;
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
                const checkUnavailable = await Booking.find({ startTime: { $gte: dataToCheck.startTime }, endTime: { $lte: dataToCheck.endTime }, areaId, parkingId: eachParking.id, isBooking: true })
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
            if (error) {
                res.json({ success: false, message: error.message });
            }
        }
    }

    const BookParkingSlot = async (req, res) => {
        try {
            const { areaId, selectedStartTime, selectedEndTime, selectedDate, parkingId } = req.body;
            const bookingId = mongoose.Types.ObjectId();
            const dataToSave = {
                _id: bookingId,
                id: bookingId,
                areaId,
                parkingId,
                userId: req.user.user,
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

    const GetUserBookings = async (req, res) => {
        try {
            const userBookings = await Booking.find({ userId: req.user.user }).populate({
                path: 'areaId',
                model: Area,
                select: 'name'
            }).populate({
                path: 'parkingId',
                model: Parking,
                select: 'name'
            });
            res.json({ success: true, message: "Successfully Found Bookings", userBookings })
        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }

    const SaveFeedbackController = async (req, res) => {
        try {
            const { name, feedback } = req.body;
            const feedbackId = mongoose.Types.ObjectId();
            const dataToSave = {
                _id: feedbackId,
                id: feedbackId,
                email: req.user.email,
                userId: req.user.user,
                fullName: name,
                message: feedback,
                reply: false
            }
            const newFeedback = new Feedback(dataToSave);
            const saveFeedback = newFeedback.save();
            res.json({success: true, message:"Successfully Saved Your Feedback"})
        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }

    const ViewFeedbackController = async (req, res) => {
        try {
            const allUserFeedbacks = await Feedback.find({ userId: req.user.user });
            res.json({ success: true, message: "Successfully Found All Feedbacks", allUserFeedbacks })
        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }

    const CancelBookingController = async (req, res) => {
        try {
            const { bookingId } = req.body;
            let deleteBooking = await Booking.updateOne({ _id: bookingId }, { isBooking: false });
            if (deleteBooking.deletedCount === 1) {
                res.json({ success: true, message: 'Successfully Cancelled Your Booking' })
            } else {
                res.json({ success: true, message: 'Sorry No User Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    app.controllers.CancelBookingController = CancelBookingController;
    app.controllers.GetParkingAreas = GetParkingAreas;
    app.controllers.GetUserBookings = GetUserBookings;
    app.controllers.SaveFeedbackController = SaveFeedbackController;
    app.controllers.ViewFeedbackController = ViewFeedbackController;
    app.controllers.GetParkingSlots = GetParkingSlots;
    app.controllers.BookParkingSlot = BookParkingSlot;
}