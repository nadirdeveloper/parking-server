module.exports = function(app,mongoose){
    const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    parkingId: {
      type: String,
    },
    areaId: {
      type: String,
    },
    email: {
      type: String,
    },
    startTime: {
      type: Number,
    },
    endTime: {
      type: Number,
    },
    isBooking: Boolean,
  },
  { timestamps: true }
);
app.db.model('Booking', bookingSchema);

}
