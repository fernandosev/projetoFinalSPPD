import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const CalendarSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  vacine: { type: Schema.Types.ObjectId, ref: "Vacine" },
  date: Date,
  hour: Number,
  dose: Number,
  Observations: String,
  status: String,
});

module.exports = mongoose.model("Calendar", CalendarSchema);
