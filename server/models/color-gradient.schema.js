import mongoose from "mongoose";
import { roles } from "../utils/roles.js";

const Schema = mongoose.Schema;

const colorGradientSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    color: [
      {
        type: String,
        validate: {
          validator: function (v) {
            var re = /^\d{10}$/;
            return !v || !v.trim().length || re.test(v);
          },
          message: "Provided Hex Color Code is invalid.",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Gradient", colorGradientSchema);
