import { useEffect, useState } from "react";
// import list from "../../public/list.json";
import Card from "../components/Card";
import { getAllBooks } from "../services/book.service.js";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fecthBooks();
  },[]);

  async function fecthBooks(){
    try{
      const data = await getAllBooks();
      setBooks(data.books);
    }catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  if(loading){
    return(
      <h1 className="text-center text-2xl mt-10">
        Loading...
      </h1>
    )
  }
  return (
    <>
      <div className="px-5 mt-18 bg-base-200 py-10">
        <h1 className="text-3xl font-bold">All Books</h1>
        <p className=" text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui
          error minima nemo, optio consequuntur odio quae recusandae molestias.
        </p>

        <div className="book grid grid-cols-1 gap-5 md:grid-cols-2 md:mb-5 md:overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {books.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Books;