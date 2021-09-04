module.exports = function (app, mongoose) {
    const { Schema } = mongoose;
    const UserSchema = new Schema({
        id:{
            type: Schema.Types.ObjectId,
        },
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        reply: {
            type: String
        },
    }, { timestamps: true });
    app.db.model('Feedback', UserSchema);
}