module.exports = function (app) {
    app.set('mongodb-uri', process.env.MONGODB_URI)
}