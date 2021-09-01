module.exports = function (app, mongooose) {
    const GetParkingAreas = async (req, res) => {
        try {

        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }
    const GetParkingSlots = async (req, res) => {
        try {

        } catch (error) {
            if (error) {
                res.json({ success: false, message: error.message });
            }
        }
    }
    app.controllers.GetParkingAreas = GetParkingAreas;
    app.controllers.GetParkingSlots = GetParkingSlots;
}