const { GenerateUniqueId } = require('../helpers/uniqueId');
const { generateUniqueId } = require('../helpers/uniqueId/generateUniqueId');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
module.exports = function (app, mongoose) {
    const { Area, Parking, User, Booking, Feedback } = app.db.models;
    const { Validator: { AdminValidator: { AreaSchema } } } = require('../helpers');
    // var myId = ;
    // Dashboard Controller for Dashboard Route
    const DashboardController = async (req, res) => {
        try {
            const usersCount = await User.count();
            const areasCount = await Area.count();
            const bookingCount = await Booking.count();
            const cancelledBookingCount = await Booking.count({ 'isBooking': false });
            const totalParkingSlots = await Parking.count();
            const totalFeedbacks = await Feedback.count();
            const dashboardData = {
                usersCount,
                areasCount,
                bookingCount,
                cancelledBookingCount,
                totalParkingSlots,
                totalFeedbacks
            }
            res.json({ success: true, message: "Successfully Got Parking Data", dashboardData });
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
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
            const areaId = mongoose.Types.ObjectId();
            const existingArea = await Area.findOne({ name: areaName });
            if (existingArea) {
                return res.json({ success: false, message: "This Area Name already exist" })
            };
            let newArea = new Area({
                _id: areaId,
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
                for (let i = 0; i < parkingSpace; i++) {
                    let newParkingId = mongoose.Types.ObjectId();
                    let newParkingSlot = {
                        _id: newParkingId,
                        id: newParkingId,
                        name: "Slot " + (i + 1),
                        areaId: areaId,
                    };
                    let newParkingSave = new Parking(newParkingSlot)
                    newParkingSave.save();
                };
                res.json({ success: true, message: 'Successfully Created Area With Slots', newArea })
            })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }
    // Get All Areas Controlle for Admin Route
    const GetAreaController = async (req, res) => {
        try {
            const allAreas = await Area.find();
            res.json({ success: true, allAreas, message: 'Successfully Found All Areas' })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }
    // Get All Booking Controller for Admin Route
    const GetBookingController = async (req, res) => {
        try {
            const allBookings = await Booking.find().populate({
                path: 'areaId',
                model: Area,
                select: 'name'
            }).populate({
                path: 'parkingId',
                model: Parking,
                select: 'name'
            });
            res.json({ success: true, allBookings, message: 'Successfully Found All Bookings' })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    // Get All Parkings Controller for Admin Route
    const GetParkingController = async (req, res) => {
        try {
            const allParking = await Parking.find().populate({
                path: 'areaId',
                model: Area,
                select: 'name'
            });
            res.json({ success: true, allParking, message: 'Successfully Found All Parkings' })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    // Get All Feedbacks Controller for Admin Route
    const GetFeedbackController = async (req, res) => {
        try {
            const allFeedbacks = await Feedback.find();
            res.json({ success: true, allFeedbacks, message: 'Successfully Found All Feedbacks' })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    // Get All Users Controller for Admin Route
    const GetUsersController = async (req, res) => {
        try {
            const allUsers = await User.find({}, { password: 0 });
            res.json({ success: true, allUsers, message: 'Successfully Found All Users' })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    const AddUserController = async (req, res) => {
        try {
            const { email, fullName, phoneNo, dob, password, role } = req.body;
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.json({ success: false, message: 'This Email Adress is Already Registered' });
            }
            const bcrypySalt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hashSync(password, bcrypySalt);
            const user = new User({
                userId: GenerateUniqueId(),
                fullName,
                email,
                password: hashedPassword,
                dob,
                role: role,
                phoneNumber: phoneNo
            });
            let saveUser = await user.save();
            res.json({ success: true, message: 'Successfully Created Users' })
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }
    const DeleteUserController = async (req, res) => {
        try {
            console.log(req.body)
            const { userId } = req.body;
            console.log(userId)
            let deleteUser = await User.deleteOne({ userId: userId });
            if (deleteUser.deletedCount === 1) {
                res.json({ success: true, message: 'Successfully Deleted User' })
            } else {
                res.json({ success: true, message: 'Sorry No User Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    const DeleteAreaController = async (req, res) => {
        try {
            console.log(req.body)
            const { areaId } = req.body;
            let deleteParkings = await Parking.remove({ areaId });
            let deleteBookings = await Booking.remove({ areaId });
            let deleteAreas = await Area.deleteOne({ id: areaId });
            if (deleteAreas.deletedCount === 1) {
                res.json({ success: true, message: 'Successfully Deleted Area' })
            } else {
                res.json({ success: true, message: 'Sorry No Area Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    };

    const DeleteBookingController = async (req, res) => {
        try {
            const { bookingId } = req.body;
            let deleteBookings = await Booking.deleteOne({ _id: bookingId });
            if (deleteBookings.deletedCount === 1) {
                res.json({ success: true, message: 'Successfully Deleted Booking' })
            } else {
                res.json({ success: true, message: 'Sorry No Booking Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    const DeleteParkingController = async (req, res) => {
        try {
            const { parkingId } = req.body;
            console.log(parkingId)
            let deleteBookings = await Booking.deleteMany({ parkingId });
            let deleteParkings = await Parking.deleteOne({ _id: parkingId });
            if (deleteParkings.deletedCount === 1) {
                res.json({ success: true, message: 'Successfully Deleted Parking' })
            } else {
                res.json({ success: true, message: 'Sorry No Parking Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    const ChangeRoleController = async (req, res) => {
        try {
            const { userId, role } = req.body;
            let cancelBooking = await User.updateOne({ userId: userId }, { role });
            if (cancelBooking.modifiedCount === 1) {
                res.json({ success: true, message: 'Successfully Changed Role' })
            } else {
                res.json({ success: true, message: 'Sorry No User Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    const CancelBookingController = async (req, res) => {
        try {
            const { bookingId } = req.body;
            let cancelBooking = await Booking.updateOne({ _id: bookingId }, { isBooking: false });
            if (cancelBooking.modifiedCount === 1) {
                res.json({ success: true, message: 'Successfully Cancelled Your Booking' })
            } else {
                res.json({ success: true, message: 'Sorry No Booking Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }

    const ReplyFeedbackController = async (req, res) => {
        try {
            const { feedbackId, feedbackReply } = req.body;
            let replyFeedback = await Feedback.updateOne({ id: feedbackId }, { reply: feedbackReply });
            if (replyFeedback.modifiedCount === 1) {
                res.json({ success: true, message: 'Successfully Saved Your Reply' })
            } else {
                res.json({ success: true, message: 'Sorry No Feedback Found' })
            }
        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message })
            }
        }
    }


    // Configuring Admin Controllers to app
    app.controllers.DashboardController = DashboardController;
    app.controllers.CreateAreaController = CreateAreaController;
    app.controllers.GetAreaController = GetAreaController;
    app.controllers.GetBookingController = GetBookingController;
    app.controllers.GetParkingController = GetParkingController;
    app.controllers.GetFeedbackController = GetFeedbackController;
    app.controllers.GetUsersController = GetUsersController;
    app.controllers.AddUserController = AddUserController;
    app.controllers.DeleteUserController = DeleteUserController;
    app.controllers.DeleteAreaController = DeleteAreaController;
    app.controllers.DeleteBookingController = DeleteBookingController;
    app.controllers.DeleteParkingController = DeleteParkingController;
    app.controllers.CancelBookingController = CancelBookingController;
    app.controllers.ReplyFeedbackController = ReplyFeedbackController;
    app.controllers.ChangeRoleController = ChangeRoleController;
}