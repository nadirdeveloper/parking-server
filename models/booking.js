module.exports = function(app,mongoose){
    const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    parkingId: {
      type: String,
    },
    areaId: {
      type: String,
    },
    userId: {
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
