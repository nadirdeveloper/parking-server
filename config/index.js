module.exports = function (app) {
    app.set('mongodb-uri', process.env.MONGODB_URI);
    app.set('password-salt', process.env.PASSWORD_SALT);
    app.set('token-secret', process.env.TOKEN_SECRET);
}