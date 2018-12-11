const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const riderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  origin: { lat: Number, lng: Number },
  destination: { lat: Number, lng: Number }
});

module.exports = mongoose.model("rider", riderSchema, "riders");
