import React from "react";
// import Navbar from "./navbar";
import list from "../../public/list.json";
import Card from "../components/Card";

function Books() {
    const books = list;
  return (
    <>
      <div className="px-5 mt-25">
        <h1 className="text-3xl font-bold">All Books</h1>
        <p className=" text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea fuga qui
          error minima nemo, optio consequuntur odio quae recusandae molestias.
        </p>

        <div className="book grid grid-cols-1 md:grid-cols-4 md:mb-5 md:overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {books.map((book) => (
            <Card key={book.id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Books;