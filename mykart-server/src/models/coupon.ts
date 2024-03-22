import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "Please Enter Coupon code"],
      unique: true,
    },
    amount: { type: Number, required: [true, "Please enter coupon amount"] },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
