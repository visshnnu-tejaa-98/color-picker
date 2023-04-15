const mongoose = "mongoose";

const Schema = mongoose.Schema;

const paletteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pallete: [
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
  { timeStamps: true }
);

export default mongoose.model("Palette", paletteSchema);
