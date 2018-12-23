const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  driver: {
    type: {
      did: mongoose.Schema.Types.ObjectId,
      name: String,
      contact: String
    }
  },
  riders: {
    type: [
      {
        origin: { lat: Number, lng: Number },
        destination: {
          lat: Number,
          lng: Number
        },
        userDetails: {
          type: {
            name: String,
            contact: String
          }
        },
        uid: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
      }
    ]
  }
});

module.exports = mongoose.model("rideHistory", userSchema, "ridehistories");
