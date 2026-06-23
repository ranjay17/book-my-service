import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          About Our Platform
        </h1>

        <p className="text-gray-600 text-center mt-4 text-lg">
          Your trusted marketplace for booking professional home services.
        </p>

        {/* Content */}
        <div className="mt-10 space-y-6 text-gray-700 leading-7">
          <p>
            <span className="font-semibold">Book My Service</span> is a modern
            service booking platform that connects users with trusted local
            professionals like electricians, cleaners, photographers, salon
            experts, and more.
          </p>

          <p>
            Our goal is to make service booking simple, fast, and reliable.
            Users can easily browse services, check ratings, book time slots,
            and manage their bookings in one place.
          </p>

          <p>
            Vendors can register, create services, manage bookings, and track
            earnings through a dedicated dashboard system.
          </p>

          <p>
            We focus on building a transparent system where customers can leave
            reviews after service completion, helping others choose better
            services.
          </p>

          <p>
            This project is built using modern technologies like
            <span className="font-semibold">
              {" "}
              React, Redux, Node.js, Express, and MongoDB
            </span>
            .
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h2 className="font-bold text-blue-600 text-xl">Easy Booking</h2>
            <p className="text-sm text-gray-600 mt-2">
              Book services in just a few clicks.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl text-center">
            <h2 className="font-bold text-green-600 text-xl">
              Trusted Vendors
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Verified professionals for quality service.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl text-center">
            <h2 className="font-bold text-purple-600 text-xl">
              Reviews System
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Real feedback after service completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
