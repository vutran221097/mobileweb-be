import mongoose, { Schema } from "mongoose"

const User = mongoose.model(
  "User",
  new Schema({
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: String,
    role: String,
  }, {
    timestamps: true
  })
);

export default User