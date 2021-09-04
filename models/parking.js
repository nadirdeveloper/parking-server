module.exports = function (app, mongoose) {
    const {Schema} = mongoose
    const parkingSchema = Schema(
        {
            id: {
                type: Schema.Types.ObjectId,
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
        },
        { timestamps: true }
    );
    app.db.model('Parking', parkingSchema);
}
