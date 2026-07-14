import React from "react";
import rupee from "../../public/rupee-sign.svg"

function Card({book}) {
  return (
    <>
      <div>
        <div className="md:w-88.5  rounded-md mb-5 border-gray-600 shadow-md shadow-base-content shadow-b flex flex-col flex-shrink-0  justify-center items-center hover:scale-103 duration-200">
          <div className="">
            <img
              className=" h-55 w-80 md:w-84 mt-2 rounded-md md:h-60 object-cover"
              src={book.img_url}
              alt=""
            />
          </div>
          <div className="w-75 md:w-82">
            <div className=" mt-2 flex justify-between">
              <h1 className="text-2xl font-semibold md:h-16">{book.name}</h1>
              <h1 className=" flex items-center justify-center mx-1 mt-2 text- border-1 rounded-md w-10 bg-amber-500 h-5">
                {book.category}
              </h1>
            </div>
            <h2 className="md:h-18">{book.title}</h2>
            <div className="flex justify-between py-5">
              <div className="border-1 w-18 rounded-2xl h-7 flex">
                <img src={rupee} alt="" />
                <h2 className="">{book.price}</h2>
              </div>

              <button className="border-1 bg-emerald-300 w-21 rounded-md">
                {book.status}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;