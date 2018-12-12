const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  riders: { type: [mongoose.Schema.Types.ObjectId], ref: "user" },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("rideHistory", userSchema);
