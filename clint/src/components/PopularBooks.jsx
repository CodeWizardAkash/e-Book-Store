import { useEffect, useState } from "react";
import Card from "./Card";
import { getPopularBooks } from "../services/book.service";

function PopularBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const data = await getPopularBooks();

        setBooks(data.books || []);
      } catch (error) {
        console.log("Error fetching popular books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  if (loading) {
    return (
      <section className="px-5 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Popular Books
        </h2>

        <p>Loading...</p>
      </section>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="px-5 py-10 mb-10 bg-base-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Popular Books
        </h2>
      </div>

      <div className="flex gap-5 overflow-x-auto scrollbar-none">
        {books.map((book) => (
          <Card
            key={book._id}
            book={book}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularBooks;