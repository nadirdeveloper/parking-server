module.exports = function (app, mongoose) {
    const { Schema } = mongoose;
    const UserSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        phoneNumber: {
            type: String,
            require: true
        },
        role: {
            type: String,
            trim: true,
            default: 'user'
        }
    }, { timestamps: true });
    app.db.model('User', UserSchema);
}