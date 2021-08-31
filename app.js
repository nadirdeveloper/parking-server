require("dotenv").config();
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config')(app)
require('./db')(app, mongoose)
require('./models/index')(app, mongoose);
require("./controllers/index")(app, mongoose);
require("./routes/index")(app);

module.exports = app;