import mongoose, { Schema } from "mongoose";

const User = mongoose.model(
  "User",
  new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default User;
