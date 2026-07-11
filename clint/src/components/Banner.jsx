import React from "react";
import banner from "/banner.png";
import emailsvg from "/email_svg.svg";

function Banner(){
    return(
        <>
        <div className="max-w-screen-2xl container flex flex-col md:px-20 py-4 mx-auto md:flex-row ">
            <div className="px-4 order-2 md:order-1 md:mt-30 w-full md:w-1/2" >
                <div>
                    <h1 className="text-4xl font-bold">Hello welcome here to learn something {" "}
                        <span className="text-emerald-600">new everyday !</span>
                    </h1>
                    <p className="mt-8 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. In labore deleniti earum sed impedit eos minima fugit beatae, obcaecati, doloremque perspiciatis unde ad nobis dolores nemo repellat iste possimus vitae.</p>
                    
                    <div className=" mt-10 border-1 border-emerald-600 rounded-md p-2 flex gap-3">
                        <img className="w-8" src={emailsvg} alt="" />
                        <input className="outline-none w-full" type="email" placeholder="abc69@gmail.com" />

                    </div>
                    
                </div>
            </div>

            <div className=" order-1 md:order-2 md:mt-15 md:w-1/2 flex items-center justify-center ">
                <img src={banner} alt="" className="w-125 " />
            </div>
            
        </div>
        </>
    )
}
export default Banner;