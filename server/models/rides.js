const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ridesSchema = new Schema({
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
  },

  // origins: {
  //   type: [
  //     {
  //       lat: Number,
  //       lng: Number,
  //       uid: { type: mongoose.Schema.Types.ObjectId }
  //     }
  //   ],
  //   ref: "user"
  // },
  // destinations: {
  //   type: [
  //     {
  //       lat: Number,
  //       lng: Number,
  //       uid: { type: mongoose.Schema.Types.ObjectId }
  //     }
  //   ],
  //   ref: "user"
  // },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("rides", ridesSchema, "ridesData");
