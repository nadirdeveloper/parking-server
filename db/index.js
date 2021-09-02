module.exports = function (app, mongoose) {
    app.db = mongoose.createConnection(app.get('mongodb-uri'), {
        // useNewUrlParser: true,
        // useUnifiedTopology: false
    });
    app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
    app.db.once('open', function () {
        console.log('Mongoose connected');
    });
}
