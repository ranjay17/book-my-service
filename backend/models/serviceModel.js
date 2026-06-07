import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    location: {
      type: String,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;