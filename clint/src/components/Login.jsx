import React from "react";

function Login({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-base-100 w-96 p-6 rounded-lg shadow-lg relativebg-base-100 text-base-content">
        
        {/* Close Button */}
        <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-xl cursor-pointer">✕</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form className="flex flex-col  items-center gap-4">
          <input className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400" type="email" placeholder="Email"/>
          <input className="input input-bordered w-full outline-none border-1 p-1 rounded-md border-gray-400" type="password" placeholder="Password"/>

          <button className="btn btn-primary w-1/3 h-9 rounded-md text-white font-semibold cursor-pointer bg-emerald-600">Login</button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account? <a className="text-primary cursor-pointer text-blue-500 ml-1" href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;