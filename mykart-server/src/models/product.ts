import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter Product name"] },
    photo: { type: String, required: [true, "Please upload photo"] },
    price: { type: Number, required: [true, "Please enter price"] },
    stock: { type: Number, required: [true, "Please enter stocks"] },
    category: {
      type: String,
      required: [true, "Please mention category"],
      enum: [
        "electronics",
        "fashion",
        "accesories",
        "sports",
        "home",
        "beuty",
        "other",
      ],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
