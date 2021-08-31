module.exports = function (app, mongoose) {
    app.controllers = {};
    require("./UserController")(app, mongoose);
}