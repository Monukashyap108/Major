import React from "react";
import Hero from "../components/Hero";
import MostPicked from "../components/MostPicked";
import PopularRooms from "../components/PopularRooms";
import Testimonials from "../components/Testimonials";
export default function Home() {
  return (
 <div className="bg-[#92918D] border  ">
  <Hero/>
  <MostPicked/>
  <PopularRooms/> 
  <Testimonials/>
 </div>
  );
}
