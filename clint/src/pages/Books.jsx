import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllBooks } from "../services/book.service.js";
import { useSearchParams } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(()=>{
    fecthBooks();
  },[search]);

  async function fecthBooks(){
    try{
      setLoading(true);

      const data = await getAllBooks(search);
      setBooks(data.books);
    }catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  
  const handleClearSearch = () => {
    setSearchParams({});
  };

  if(loading){
    return(
      <h1 className="text-center text-2xl mt-10">
        Loading...
      </h1>
    )
  }
  return (
    <div className="px-5 mt-18 bg-base-200 py-10 min-h-screen">

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">

        <div>
          <h1 className="text-3xl font-bold">
            All Books
          </h1>

          {/* Result Count */}
          <p className="text-gray-600 mt-2">
            {search
              ? `${books.length} result${books.length !== 1 ? "s" : ""} found for "${search}"`
              : `${books.length} book${books.length !== 1 ? "s" : ""} available`
            }
          </p>
        </div>

        {/* Clear Search */}
        {search && (
          <button
            onClick={handleClearSearch}
            className="btn btn-outline btn-sm"
          >
            Clear Search
          </button>
        )}

      </div>

      {/* Search Result */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">

          <h2 className="text-2xl font-bold mb-2">
            No books found
          </h2>

          {search && (
            <p className="text-gray-500 mb-5">
              No books match "{search}"
            </p>
          )}

          {search && (
            <button
              onClick={handleClearSearch}
              className="btn btn-primary"
            >
              Clear Search
            </button>
          )}

        </div>
      ) : (
        <div className="book grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
          {books.map((book) => (
            <Card
              key={book._id}
              book={book}
            />
          ))}
        </div>
      )}

    </div>
  );
}
export default Books;