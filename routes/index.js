module.exports = function (app,mongoose) {
    require("./user")(app,mongoose);
    require("./admin")(app,mongoose);
    require("./parking")(app,mongoose);
}