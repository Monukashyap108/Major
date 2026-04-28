import React, { useContext } from "react";
import { AppContext } from "../content/AppContext";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import { Link } from "react-router-dom";
import {assets  }from "../assets/assets.js";
import toast from "react-hot-toast";


export default function Navbar() {
     const {Navigate, user ,setUser } = useContext(AppContext)
     const navigate = useNavigate();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotel' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'About', path: '/about' },
    ];

   
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

   const logout = () =>{
    setUser(false);
    toast.success("Logout Successfully");
    navigate("/");
   }

    return (
        <div  className="h-75 md:h-20 ">
            
            <nav className={`fixed top-0 left-0 bg-[rgba(15,10,4,0.92)] w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50  py-4 md:py-6`}>

                {/* Logo */}
                <a href="#" className=" flex items-start "> 
                    <h1 className="text-[#e8d5a3]  text-2xl  ">VOYASTRA  </h1>
                 
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8 text-white   font-thin">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5text-white/70 hover:text-yellow-200`}>
                            {link.name}
                            <div className={` bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-xl cursor-pointer text-white transition-all hover:text-yellow-200`}>
                        Owner
                    </button>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">

                    { user ? (
                       <div className="relative group inline-block">
                        <img 
                        src={assets.profile_icon} 
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                         />

                      
                         <div className="bg-white  shadow-lg border border-gray-300 rounded-md opacity-0 group-hover:opacity-100
                         group-hover:visible invisible transition duration-300 z-50 absolute right-0 mt-2 w-40
                         ">
                            <ul className="py-1">
                                <li>
                                    <Link to = "/my-bookings" className="cursor-pointer block px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 "   >My-Booking</Link>
                                    </li>
                                    <li>
                                        <button  className="cursor-pointer block px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 "   onClick={logout}>Logout</button>
                                        </li>
                            </ul>
                         </div>
                       </div>
                    ) : (
                    <button 
                    onClick={()=>{navigate("/login")}}
                    className={"px-8 py-1  ml-4 transition-all duration-500       text-white bg-yellow-600/80 hover:bg-yellow-600/70  cursor-pointer"}>
                        Login
                    </button>
                     )
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer  ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                     Owner
                    </button>

                    <button 
                    onClick={()=>{navigate("/login")}}
                   className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                    
                        Login
                    </button>
                </div>
            </nav>
        </div>
    );
}