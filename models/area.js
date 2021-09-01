module.exports = function (app, mongoose) {
    const { Schema } = mongoose;
    const areaSchema = new Schema(
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
                unique: true,
                max: 64,
            },
            totalPakringSpace: {
                type: Number,
                trim: true,
                required: true,
            },
        },
        { timestamps: true }
    );
    app.db.model('Area', areaSchema);
}