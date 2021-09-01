module.exports = function (app, mongoose) {
    const DashboardController = async (req, res) => {
        try {

        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    };
    const CreateAreaController = async (req, res) => {
        try {

        } catch (error) {
            if (error) {
                res.json({ success: false, error: error.message })
            }
        }
    }
    const GetAreaController = async (req, res) => {
        try {

        } catch (error) {
            if (error) {

            }
        }
    }
    app.controllers.DashboardController = DashboardController;
    app.controllers.CreateAreaController = CreateAreaController;
    app.controllers.GetAreaController = GetAreaController;
}