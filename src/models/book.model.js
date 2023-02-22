import mongoose, { Schema } from "mongoose"

const Book = mongoose.model(
  "Book",
  new Schema({
    _id: {
      type: Schema.ObjectId, auto: true
    },
    viewCount: Number,

  }, {
    timestamps: true
  })
);

export default Book