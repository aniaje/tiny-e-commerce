import mongoose from "mongoose";

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    console.log("Mongoose already connected");
    return mongoose.connection.asPromise();
  }
  return mongoose.connect(`${process.env.MONGODB_URL}`);
}
