import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  gender: String,
  street: String,
  number: Number,
  sector: String,
  city: String,
  state: String,
  alergics: [String],
});

module.exports = mongoose.model("User", UserSchema);
