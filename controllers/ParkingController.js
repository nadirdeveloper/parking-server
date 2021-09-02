module.exports = function (app, mongooose) {
    const { Area, Parking } = app.db.models;
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
            const { areaId } = req.body;
            const allParkings = await Parking.find({ areaId });
            res.json({ success: true, allParkings, message: "Successfully found All Parkings" })
        } catch (error) {
            console.log(error)
            if (error) {
                res.json({ success: false, message: error.message });
            }
        }
    }
    app.controllers.GetParkingAreas = GetParkingAreas;
    app.controllers.GetParkingSlots = GetParkingSlots;
}