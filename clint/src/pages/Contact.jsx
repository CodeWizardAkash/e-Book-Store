import React from "react";
import Navbar from "../components/Navbar.jsx";

function Contact() {
  return (
    <>
    {/* <Navbar/> */}
    <section id="contact" className="py-16 mt-15 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            Have a question, suggestion, or need help? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">📚 BookStore</h3>
              <p className="text-gray-600 mt-1">
                Your one-stop destination for books and courses.
              </p>
            </div>

            <div className="space-y-3">
              <p>📍 Jalpaiguri, West Bengal, India</p>
              <p>📧 support@bookstore.com</p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <form className="space-y-4 flex flex-col items-center">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full outline-none border border-gray-200 rounded-md py-1 px-3"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full outline-none border border-gray-200 rounded-md py-1 px-3"
              />
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full outline-none border border-gray-200 rounded-md py-1 px-3"
                rows="4"
              ></textarea>

              <button className="btn btn-primary w-1/3 text-white font-semibold p-1 rounded-md cursor-pointer bg-emerald-500">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}

export default Contact;