import mongoose from "mongoose";
import { BOTTOM, LEFT, RIGHT, TOP } from "../utils/constants.js";

const Schema = mongoose.Schema;

const colorGradientSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    colors: [
      {
        type: String,
        validate: {
          validator: function (v) {
            var re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            return !v || !v.trim().length || re.test(v);
          },
          message: "Provided Hex Color Code is invalid.",
        },
      },
    ],
    direction: {
      type: String,
      enum: [LEFT, RIGHT, TOP, BOTTOM],
    },
    angle: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gradient", colorGradientSchema);
