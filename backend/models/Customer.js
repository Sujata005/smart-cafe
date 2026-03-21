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

});

export default mongoose.model(
  "Customer",
  customerSchema
);