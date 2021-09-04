module.exports = function(app,mongoose){
    require("./user")(app,mongoose);
    require("./area")(app,mongoose);
    require("./parking")(app,mongoose);
    require("./feedback")(app,mongoose);
    require("./booking")(app,mongoose);
}