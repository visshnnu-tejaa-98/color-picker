import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = await process.env.MONGO_CONNECTION_URL;
    const options = {
      connectTimeoutMS: 30000, // 30 seconds
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    const conn = await mongoose.connect(
      process.env.MONGO_CONNECTION_URL,
      options
    );
    console.log(`Mongodb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
