const mongoose = require("mongoose");

const connectToDatabase = () => {
  const mongoURI = process.env.MONGO_URI;

  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
      process.exit(1);
    });
};

module.exports = connectToDatabase;