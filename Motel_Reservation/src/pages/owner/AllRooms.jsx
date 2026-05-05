import React, { useContext } from "react";
import { AppContext } from "../../content/AppContext";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import RegisteredHotel from "./RegisteredHotel";
import {useState,useEffect} from "react"
import toast from "react-hot-toast";
export default function AllRooms  () {
  const navigate = useNavigate();
  const {axios } = useContext(AppContext);

  const[roomsData,setRoomsData]=useState([])
  
  const fetchOwnerRooms = async ()=>{
    try{
      const  {data} = await axios.get('/api/room/get');
      if(data.success){
        setRoomsData(data.room)
    
      }else{
        toast.error("Hello" , data.message)
      }

      
    }catch(error){
    toast.error(
    error?.response?.data?.message || error.message || "Something went wrong"
  );
    }
  }

  useEffect(()=>{
   fetchOwnerRooms();
    
  },[])
const  deleteRoom = async(id)=>{
  try{
    const {data} = await axios.delete("/api/room/delete/"+id);
    if(data.success){
      toast.success(data.message)
      fetchOwnerRooms();
    }
    else
    {
      toast.error(data.message)
    }
  }
    catch(error){
       toast.error(error.message)
    }
  
}

  return (
    <div className="min-h-screen bg:gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto ">
        {/* header */}
        <div
          className="mb-8 flex flex-col md:flex-row  justify-between items-center
      bg-white/50 rounded-2xl shadow-xl p-6  "
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-400 mb-2">
             Your Rooms Collection
            </h1>
            <p className="text-gray-600">
              Discover exceptional stays here
            </p>
          </div>
          <button
            className="bg-yellow-900 ml-4 text-white px-6 py-2 mb-5 rounded-md cursor-pointer"
            onClick={() => navigate("/owner/add-room")}
          >
            Add Room
          </button>
        </div>
        {/* hotel table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[rgba(15,10,4,0.92)] text-white ">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Hotel
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                   Room Type
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Hotel Address
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Hotel Rating
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Price Per Night
                  </th>
                 
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Amenities
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {roomsData?.map((room, index) => (
                  <tr
                    key={room._id}
                    className={`hover:bg-blue-50 transition-all duration-200 ${
                      index % 2 === 0 ? " bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                               
                          <img
                            src={
   
     `http://localhost:4000/images/${room.images[0]}`
   
}
                            alt={room.name}
                            className="w-20 h-16 rounded-xl object-cover shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/30 hover:bg-black/60 transition-all duration-200  "></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {room.hotelName}
                          </h3>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <MapPin className='w-4 h-4 text-gray-400 mt-1 flex-shrink-0"' />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {room.roomType}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {room.hotel?.hotelAddress}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 fill-current" />
                        <span className="text-gray-600 text-sm leading-relaxed">
                 {room?.hotel?.rating }
                        </span>
                      </div>
                    </td>

                    {/* <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <span className="text-gray-600 text-sm leading-relative">
                          {room.pricePerNight}
                        </span>
                      </div>
                    </td> */}
                    <td className="px-6 py-6">
                      <span className="text-green-600 text-2xl  leading-relaxed">
                        ${ room?.pricePerNight}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-1">
                         {room.amenities &&
  (Array.isArray(room.amenities)
    ? room.amenities
    : room.amenities.split(",")
  ).map((item, index) => (
    <span
      key={index}
      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg"
    >
      {item}
    </span>
))}
                      </div>
                    </td>
                    <td>
                      <button onClick = {()=>{deleteRoom(room._id)}} className="bg-red-500 text-white px-4 py-1 rounded-full cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
