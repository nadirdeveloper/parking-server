const express = require("express");
const app = express();

require("./routes/index")(app);

module.exports = app;