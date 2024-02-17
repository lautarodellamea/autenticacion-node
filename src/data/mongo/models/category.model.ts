import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  available: {
    type: Boolean,
    default: true,
  },

  // creamos una relacion al modelo de los usuario
  user: {
    //  typo especial similar a booleanos, string, pero obliga que tiene que ser un id de mongo
    type: Schema.Types.ObjectId,
    // referencia al modelo de usuario
    ref: "User",
    require: true,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
