module.exports = function (app, mongoose) {
    app.controllers = {};
    require("./UserController")(app, mongoose);
    require("./ParkingController")(app, mongoose);
    require("./AdminController")(app, mongoose);
}