import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },

  price: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },

  // relacion al modelo de las categorias
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  }
});

export const productModel = mongoose.model("Product", productSchema);
