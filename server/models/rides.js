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
   isConfirmed:Boolean,
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
            price: Number,
            name: String,
            contact: String,
            isPromo: Boolean
          }
        },
        isConfirmed: Boolean,
        uid: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
      }
    ]
  }

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
});

module.exports = mongoose.model("rides", ridesSchema, "ridesData");
