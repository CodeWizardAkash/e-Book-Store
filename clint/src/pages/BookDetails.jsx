import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../services/book.service";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);

      setBook(res.data.book);
    } catch (err) {
      console.log(err);
    }
  };

  if (!book) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-24 px-6">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={book.image}
          alt={book.title}
          className="rounded-xl shadow-xl"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {book.title}
          </h1>

          <p className="mt-2 text-xl">
            {book.author}
          </p>

          <p className="mt-5">
            {book.description}
          </p>

          <div className="mt-5 space-y-2">

            <p><b>Category:</b> {book.category}</p>

            <p><b>Language:</b> {book.language}</p>

            <p><b>Pages:</b> {book.pages}</p>

            <p><b>Publisher:</b> {book.publisher}</p>

            <p><b>Published:</b> {book.publishedYear}</p>

            <p><b>Rating:</b> ⭐ {book.rating}</p>

          </div>

          <div className="mt-6 flex items-center gap-5">

            <span className="text-3xl font-bold text-green-600">
              ₹{book.price}
            </span>

            <button className="btn btn-warning">
              Add to Cart
            </button>

            <button className="btn btn-success">
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;