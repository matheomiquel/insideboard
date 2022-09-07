import mongoose from "mongoose";
const getConnection = async function () {
  try {
    await mongoose.connect(
      `mongodb://${process.env.HOST}/${process.env.DATABASE}`,
    );
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
};

getConnection();
