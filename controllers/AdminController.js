const { GenerateUniqueId } = require('../helpers/uniqueId');
const { generateUniqueId } = require('../helpers/uniqueId/generateUniqueId');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
module.exports = function (app, mongoose) {
    const { Area, Parking, User } = app.db.models;
    const { Validator: { AdminValidator: { AreaSchema } } } = require('../helpers');

    // Dashboard Controller for Dashboard Route
    const DashboardController = async (req, res) => {
        try {
            const usersCount = await User.count();
            const areasCount = await Area.count();
            const bookedParkingCount = await Parking.count({ 'isBooked': true });
            const availableParkingCount = await Parking.count({ 'isBooked': false });
            const dashboardData = {
                usersCount,
                areasCount,
                bookedParkingCount,
                availableParkingCount
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
                for (let i = 0; i < parkingSpace; i++) {
                    let newParkingSlot = {
                        id: GenerateUniqueId(),
                        name: "Slot " + (i + 1),
                        areaId: areaId,
                        startTime: null,
                        endTime: null,
                        lastUser: null,
                        isBooked: false
                    };
                    let newParkingSave = new Parking(newParkingSlot)
                    newParkingSave.save();
                };
                // Parking.insertMany([...parkingSlots]).then(() => {
                //     
                // }).catch((error) => {
                //     if (error) {
                //         console.log(error)
                //         res.json({ success: false, message: 'Error Creating Slots for Parking' });
                //     }
                // })
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
            const { email, fullName, phoneNo, dob, password } = req.body;
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
                role: 'user',
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
            if(deleteUser.deletedCount === 1){
                res.json({ success: true, message: 'Successfully Deleted User' })
            }else{
                res.json({ success: true, message: 'Sorry No User Found' })
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
    app.controllers.GetUsersController = GetUsersController;
    app.controllers.AddUserController = AddUserController;
    app.controllers.DeleteUserController = DeleteUserController;
}