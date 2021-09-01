module.exports = function (app, mongoose) {
    const {Schema} = mongoose
    const parkingSchema = Schema(
        {
            id: {
                type: String,
                trim: true,
                required: true,
                unique: true,
                lowercase: true,
            },
            name: {
                type: String,
                trim: true,
                required: true,
                max: 64,
            },
            areaId: {
                type: String,
                trim: true,
                required: true,
                lowercase: true,
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
            },
        },
        { timestamps: true }
    );
    app.db.model('Parking', parkingSchema);
}
