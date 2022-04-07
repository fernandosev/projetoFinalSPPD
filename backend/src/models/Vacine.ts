import * as mongoose from "mongoose";

const VacineSchema = new mongoose.Schema({
  title: String,
  description: String,
  doses: Number,
  frequency: String,
  interval: Number,
});

module.exports = mongoose.model("Vacine", VacineSchema);
