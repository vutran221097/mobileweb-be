import mongoose, { Schema } from "mongoose";

const News = mongoose.model(
  "News",
  mongoose.Schema(
    {
      title: {
        type: String,
      },
      body: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default News;
