import React from "react";
import Navbar from "../components/Navbar";
function About() {
  return (
    <>
    <Navbar/>
    <section id="about" className="py-16 mt-15 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">About BookStore</h2>
          <p className="text-gray-600 mt-2">
            Learn. Read. Grow. One platform for books and courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text Content */}
          <div className="space-y-5">
            <p className="text-gray-600 leading-relaxed">
              BookStore is an online learning and reading platform designed for
              students, developers, and lifelong learners. We provide a wide
              range of free and premium books and courses to help you improve
              your knowledge and skills.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our mission is to make quality education accessible to everyone.
              Whether you want to learn web development, programming, or explore
              new topics through books, BookStore is the right place for you.
            </p>

            <div className="flex gap-6 mt-6">
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-gray-500">Books</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="text-sm text-gray-500">Courses</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-sm text-gray-500">Students</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_640.jpg"
              alt="About BookStore"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>

        </div>
      </div>
    </section>
    </>
  );
}

export default About;