import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Programming",
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Database",
        "AI",
        "DevOps",
        "Cyber Security",
        "Others",
      ],
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    isFree: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    language: {
      type: String,
      default: "English",
    },

    pages: {
      type: Number,
      default: 0,
    },

    publishedYear: {
      type: Number,
    },

    publisher: {
      type: String,
    },

    stock: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;