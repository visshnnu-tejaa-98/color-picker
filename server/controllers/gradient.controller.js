import Gradient from "../models/color-gradient.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

/******************************************************
 * @Get gradient by Id
 * @route http://localhost:9000/api/v1/gradient/:id
 * @description Get the details of gradient by Id
 * @returns Gradient Object
 ******************************************************/

export const getGradientById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new CustomError("Please Provide appropriate ids", 400);
  const gradient = await Gradient.find({ _id: id });
  res.status(200).json({ sucess: true, gradient });
});

/******************************************************
 * @Get All gradients
 * @route http://localhost:9000/api/v1/gradient
 * @description Get the details of gradients
 * @returns List of all Gradients
 ******************************************************/

export const getAllGradients = asyncHandler(async (req, res) => {
  const gradients = await Gradient.find({});
  res.status(200).json({ sucess: true, gradients });
});

/******************************************************
 * @Get Add Gradient
 * @route http://localhost:9000/api/v1/gradient/addGradient
 * @description Add Gradient to database
 * @returns Created Gradient
 ******************************************************/

export const addGradient = asyncHandler(async (req, res) => {
  const { colors, userId, user } = req.body;
  let colorsArray = colors.split(";");
  if (colorsArray.length > 3 || colorsArray.length < 2)
    throw new CustomError(
      "Minimum of 2 or Maximum of 3 colors are accepted",
      400
    );

  let gradient = await Gradient.create({ userId, colors: colorsArray });
  res.status(201).json({
    sucess: true,
    gradient,
  });
});

/******************************************************
 * @Get Update Gradient
 * @route http://localhost:9000/api/v1/gradient/updateGradient/:id
 * @description Update Gradient by Id
 * @returns Updated Gradient
 ******************************************************/

export const updateGradient = asyncHandler(async (req, res) => {
  const { colors, userId } = req.body;
  const { id } = req.params;

  console.log(id, colors, userId);
  let colorsArray = colors.split(";");
  if (colorsArray.length > 3 || colorsArray.length < 2)
    throw new CustomError(
      "Minimum of 2 or Maximum of 3 colors are accepted",
      400
    );
  console.log(colorsArray);
  const gradient = await Gradient.findOneAndUpdate(
    { _id: id, userId },
    { colors: colorsArray },
    { new: true, runValidators: true }
  );

  console.log(gradient);
  res.status(200).json({ sucess: true, gradient });
});

/******************************************************
 * @Get Detete Gradient
 * @route http://localhost:9000/api/v1/gradient/deleteGradient/:id
 * @description Delete Gradient by Id
 * @returns Status of event
 ******************************************************/

export const deleteGradient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Gradient.findByIdAndDelete({ _id: id });
  res
    .status(200)
    .json({ sucess: true, message: "Gradient Deleted Sucessfully" });
});
