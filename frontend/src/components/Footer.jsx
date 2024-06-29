import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" mt-14 bg-secondary text-white">
      <div className="flex flex-col md:flex-row justify-between p-8 lg:px-28 md:px-16 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-2xl pb-4">Car System</h1>
          <p className=" mb-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam autem
            ea alias labore voluptatem sed assumenda, ipsum maxime ratione ipsa?
          </p>
        </div>
      
        <div>
          <h1 className=" font-semibold text-xl pb-4 pt-5 md:pt-0">
            Cars Categories
          </h1>
          <div className=" flex flex-col gap-2 font-medium">
            <Link
              to="/"
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
              Acura
            </Link>
            <Link
              to="/"
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
             Ferrari
            </Link>
            <Link
              to="/"
              className=" hover:translate-x-3 transition duration-200 ease-linear"
            >
            Nissan
            </Link>
            
          </div>
        </div>
      </div>
      <div>
        <p className=" text-center py-4">
          @copyright developed by
          <span className=" text-primary font-semibold mx-2">
            Backend programmers
          </span>
          | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;