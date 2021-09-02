module.exports = function (app, mongoose) {
    const {Schema} = mongoose
    const parkingSchema = Schema(
        {
            id: {
                type: String,
                required: true,
                unique: true,
            },
            name: {
                type: String,
                required: true,
                max: 64,
            },
            areaId: {
                type: String,
                required: true,
            },
            startTime: {
                type: String,
            },
            endTime: {
                type: String,
            },
            lastUser: {
                type: String,
            },
            isBooked: {
                type: Boolean,
            }
        },
        { timestamps: true }
    );
    app.db.model('Parking', parkingSchema);
}
