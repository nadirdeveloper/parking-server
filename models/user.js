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
            minlength: 8,
            maxlength: 16,
            trim: true,
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
        role: {
            type: String,
            trim: true,
            default: 'user'
        },
        phoneNumber: {
            type: String,
            require: true
        },
        isActive: {
            type: Boolean,
            trim: true,
            default: false
        },

    }, { timestamps: true });
    app.db.model('User', UserSchema);
}