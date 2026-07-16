import React from "react";
// import rupee from "../../public/rupee-sign.svg"

function Card({book}) {
  return (
    <>
      <div>
        <div className="md:w-88.5 rounded-md  shadow-xl flex flex-col flex-shrink-0  justify-center items-center hover:scale-103 duration-200 bg-base-100">
          <div className="h-64 border-none">
            <img
              className=" h-full w-full border-none object-cover"
              src={book.image}
              alt=""
            />
          </div>
          <div className="w-75 md:w-82">
            <div className="flex justify-end gap-1 mt-0.5">
              <p className="text-sm">Rating</p>
              <p className=" border-gray-300 rounded-2xl px-2 text-sm border-1">{book.rating}🌟</p>
            </div>
            
            <h1 className="text-2xl font-semibold">{book.title}</h1>
            <h2 className="mb-3 text-sm">{book.author}</h2>
            <h3 className="md:h-22" >{book.description}</h3>
            


            <div className="flex justify-between  px-2 mt-2">
              <h1
              className=" inline-block p-1 px-2 text-sm text-white rounded-3xl bg-gray-500">
                {book.category}
              </h1>

              <div className="flex gap-3">
                <h2 className="font-semibold text-sm text-gray-400">-₹{book.price+75}-</h2>
                <h2 className="font-semibold mr-3 text-xl">₹{book.price}</h2>
              </div>
            </div>
            
            <div className="flex justify-between py-5 mb-2 ">
              <button className="  bg-amber-500 w-38 hover:bg-amber-600 font-semibold py-2 px-5 rounded-md">
                ADD TO CART                
              </button>
              <button className=" bg-emerald-400 w-38 hover:bg-emerald-500 font-semibold py-2 rounded-md">
                BUY NOW
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Card;