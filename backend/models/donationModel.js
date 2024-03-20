const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    donor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "taken"],
      default: "pending",
    },
    dateTaken: {
      type: String,
    },
    aiRejections: [
      {
        reciptient: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        reason: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
