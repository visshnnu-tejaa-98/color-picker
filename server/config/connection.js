import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const options = {
      connectTimeoutMS: 30000, // 30 seconds
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    const conn = await mongoose.connect(
      "mongodb://0.0.0.0:27017/color-picker",
      options
    );
    console.log(`Mongodb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
