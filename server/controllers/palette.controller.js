import Palette from "../models/palette.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

/******************************************************
 * @Get Palette by Id
 * @route http://localhost:9000/api/v1/palette/:id
 * @description Get the details of palette by Id
 * @returns palette Object
 ******************************************************/

export const getPaletteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new CustomError("Please Provide appropriate ids", 400);
  const palette = await Palette.find({ _id: id });
  res.status(200).json({ sucess: true, palette });
});

/******************************************************
 * @Get All Palette
 * @route http://localhost:9000/api/v1/palette
 * @description Get the details of palette
 * @returns List of all palette
 ******************************************************/

export const getAllPalette = asyncHandler(async (req, res) => {
  const palette = await Palette.find({}).sort({ updatedAt: "desc" });
  res.status(200).json({ sucess: true, palette });
});

/******************************************************
 * @Get Add Palette
 * @route http://localhost:9000/api/v1/palette/addpalette
 * @description Add Palette to database
 * @returns Created palette
 ******************************************************/

export const addPalette = asyncHandler(async (req, res) => {
  const { colors, userId } = req.body;
  console.log(req.body);
  let colorsArray = colors.split(";");
  if (colorsArray.length !== 4)
    throw new CustomError("Please provide exact 4 colors", 400);
  let palette = await Palette.create({ userId, palette: colorsArray });
  res.status(201).json({
    sucess: true,
    palette,
  });
});

/******************************************************
 * @Get Update Palette
 * @route http://localhost:9000/api/v1/palette/updatePalette/:id
 * @description Update Palette by Id
 * @returns Updated Palette
 ******************************************************/

export const updatePalette = asyncHandler(async (req, res) => {
  const { colors, userId } = req.body;
  const { id } = req.params;

  let colorsArray = colors.split(";");
  if (colorsArray.length !== 4)
    throw new CustomError("Please provide exact 4 colors", 400);
  const palette = await Palette.findOneAndUpdate(
    { _id: id, userId },
    { palette: colorsArray },
    { new: true, runValidators: true }
  );

  res.status(200).json({ sucess: true, palette });
});

/******************************************************
 * @Get Detete palette
 * @route http://localhost:9000/api/v1/palette/deletePalette/:id
 * @description Delete palette by Id
 * @returns Status of event
 ******************************************************/

export const deletePalette = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Palette.findByIdAndDelete({ _id: id });
  res
    .status(200)
    .json({ sucess: true, message: "Palette Deleted Sucessfully" });
});
