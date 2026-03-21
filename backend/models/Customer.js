import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  name: String,

  ordersCount: {
    type: Number,
    default: 0,
  },

  points: {
    type: Number,
    default: 0,
  },

  rewards: {
    type: [String],
    default: [],
  },

});

export default mongoose.model(
  "Customer",
  customerSchema
);