import React, { useState } from "react";
import Login from "../components/Login";
import { signup } from "../services/auth.service.js";

function Signup(){
    const [openLogin, setOpenLogin] = useState(false);
    const [formData, setformData] = useState({
        fullname: "",
        email: "",
        password: "",
    })

    const handleChange = (e)=>{
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const data = await signup(formData);
            alert(data.message);

            setformData({
                fullname: "",
                email: "",
                password: "",
            });
        }catch(error){
            console.log(error.response?.data || error.message);
        }
    }

    return(
        <>
        <div className="flex justify-center items-center h-screen bg-base-200">
            <div className="w-100 relative  rounded-md shadow-xl p-5 relative bg-base-100">

                <button className=""><a className="absolute top-3 right-4 text-xl" href="/">✕</a></button>
                <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <h1>Full Name</h1>
                    <input
                        className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400" 
                        type="text" 
                        placeholder="Enter your fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    <h1>Email</h1>
                    <input 
                        className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <h1>Password</h1>
                    <input 
                        className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400" 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className="flex justify-center">
                        <button className="btn btn-primary w-25 h-8  rounded-md text-white font-semibold cursor-pointer bg-emerald-600">Sign up</button>
                    </div>
                    
                    
                </form>
                <div className="flex justify-end mt-3">
                    <p>Have account? <button className="text-blue-500 cursor-pointer" onClick={()=>setOpenLogin(true)} >Login</button></p>
                </div>
                
            </div>
        </div>
        <Login open={openLogin} setOpen={setOpenLogin} />
        </>
    )
}
export default Signup;