import React, {useState} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import { GiSteeringWheel } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenuUnfoldFill } from "react-icons/ri";

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);

    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };
    
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        setUser(null);
        navigate('/signin');
    };

    return (
        <header className=" fixed w-full z-10 bg-secondary text-white py-4">
        {/* desktop navigation section  */}
        <nav className=" container flex justify-between items-center">
          <div className=" flex items-center gap-2">
            <GiSteeringWheel size={35} className=" text-primary" />
            <Link to="/" className=" font-bold text-2xl">
              Car System
            </Link>
          </div>
  
          <div className=" hidden md:flex items-center gap-8 font-medium text-xl">
            {/* <Link
              to="/"
              className=" hover:text-primary transition duration-200 ease-linear"
            >
              Home
            </Link> */}
           
            
            <Link to="/signup" className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
              Sign Up
            </Link>
  
            <Link to="/signin" className=" hidden lg:flex border-2 border-primary text-lg px-4 rounded-md hover:bg-primary transition duration-200 ease-linear">
              Sign In
            </Link>
          </div>
  
          <div className=" md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <RiMenuUnfoldFill size={25} onClick={handleChange} />
            )}
          </div>
        </nav>
  
        {/* responsive section  */}
        <div
          className={`${menu ? "translate-x-0" : "-translate-x-full"}
         md:hidden flex flex-col absolute bg-secondary text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-3/4 h-fit rounded-br-xl transition-transform duration-300`}
        >
          <Link
            to="/"
            className=" hover:text-primary transition duration-200 ease-linear"
          >
            Home
          </Link>
          <div>
            <Link to="/signup" className="border-2 border-primary py-1 px-4 rounded-md">
            Sign Up
            </Link>
          </div>
          <div>
          <Link  to="/signin" className="border-2 border-primary py-1 px-4 rounded-md">
              Sign In
            </Link>
          </div>
        </div>
      </header>
    );
};

export default Navbar;
