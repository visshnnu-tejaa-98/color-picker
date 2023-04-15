import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favouritesSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  palette: [
    {
      paletteId: mongoose.Types.ObjectId,
      ref: "Palette",
    },
  ],
  gradients: [
    {
      gradientId: mongoose.Types.ObjectId,
      ref: "Gradient",
    },
  ],
});

export default mongoose.model("Favourite", favouritesSchema);
