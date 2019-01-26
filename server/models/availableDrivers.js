const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  name: String,
  origin: { lat: Number, lng: Number },
  contact: String
});

module.exports = mongoose.model(
  "availableDrivers",
  userSchema,
  "availableDrivers"
);
