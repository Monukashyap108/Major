import React from "react";
import { cities } from "../assets/assets";

function Hero() {
  return (
    <>
      <main
        className="flex flex-col   w-full h-screen md:flex-row items-center max-md:text-center
    sm:px-10 md:px-20 max-w-7xl   justify-center mx-auto  
    
      
    "
      >
        {/* first div */}
        <div className="flex flex-col justify-center items-center text-center">
          <p
            className="text-heading  text-2xl sm:text-4xl md:text-xl max-w-2xl leading-tight  text-[#C6BB9C] font-thin
        "
          >
            {" "}
            WELCOME TO VOYASTRA
          </p>
          <h3 className="w-full font-frukturn mt-2 max-w text-6xl md:text-8xl text-[#FFFFFF]  leading-relaxe  py-2 font-thin">
            Where luxury <br />{" "}
            <span className="font-frukturn  font-thin mt-2">
              Becomes legacy
            </span>
          </h3>
          <p className="mt-4 text-[#FFFFFF] text-center  w-2/3 font-frukturn">
            Choose from our curated collection of accommodations, each designed
            to offer an exceptional stay.
          </p>
          <div className="flex flex-col md:flex-row  items-center mt-8 gap-3">
            <button className="bg-[#967528]  font-thin  text-white  px-12 py-3  flex items-center cursor-pointer hover:bg-[#695015]">
              Show more
            </button>
          </div>
        </div>

        {/* second */}
        <div>
          <button></button>
        </div>
      </main>
      {/*  form for the detination moments */}
      <form className=" justify-center items-center  max-w-4xl rounded-xl mb-5 w-full mx-auto    bg-[#1b1208] text-gray-900  px-6 py-8        flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div className="text-[#FFFFFF] ">
          <div className="flex items-center gap-2 ">
            <svg
              className="w-4 h-4 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className=" rounded border  border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2 text-[#FFFFFF] ">
            <svg
              className="w-4 h-4 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none text-[#FFFFFF]"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 text-[#FFFFFF] ">
            <svg
              className="w-4 h-4 text-gray-200 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none text-[#FFFFFF]"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center text-[#FFFFFF] ">
          <label htmlFor="guests">Persons</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1  bg-[#967528] py-3 px-9 text-white my-auto  mt-4 cursor-pointer max-md:w-full max-md:py-1">
          <span>Search</span>
        </button>
      </form>
    </>
  );
}

export default Hero;
