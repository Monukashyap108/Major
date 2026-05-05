import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../content/AppContext";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Star } from "lucide-react";
import RegisteredHotel from "./RegisteredHotel";
import toast from "react-hot-toast";

export default function AllHotels() {
  const navigate = useNavigate();
  const { axios } = useContext(AppContext);
  const [hotelData, setHotelData] = useState([]);

  const fetchOwnerHotels = async () => {
    try {
      const { data } = await axios.get("/api/hotel/get");
      if (data.success) {
        setHotelData(data.hotels || []);
      } else {
        toast.error("failed to fetch hotel data");
      }
    } catch (error) {
      // toast.error("failed to fetch hotel data");
      toast.error("failed to fetch hotel data");
    }
  };
  useEffect(() => {
    fetchOwnerHotels();
  }, []);
  const deleteHotel = async (id) => {
    try {
      const { data } = await axios.delete(`/api/hotel/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchOwnerHotels();
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
              Premium Hotels Collection
            </h1>
            <p className="text-gray-600">
              Discover exceptional stays around the world
            </p>
          </div>
          <button
            className="bg-yellow-900 ml-4 text-white px-6 py-2 mb-5 rounded-md cursor-pointer"
            onClick={() => navigate("/owner/register-hotel")}
          >
            Register Hotel
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
                    Location
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Hotel Owner
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Contact
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Rating
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-winder">
                    Price
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
                {hotelData?.map((hotel, index) => (
                  <tr
                    key={hotel._id}
                    className={`hover:bg-blue-50 transition-all duration-200 ${
                      index % 2 === 0 ? " bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={`http://localhost:4000/images/${hotel.image}`}
                            alt={hotel.hotelName}
                            className="w-20 h-16 rounded-xl object-cover shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/30 hover:bg-black/60 transition-all duration-200  "></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {hotel.hotelName}
                          </h3>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <MapPin className='w-4 h-4 text-gray-400 mt-1 flex-shrink-0"' />
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {hotel.hotelAddress}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {hotel.owner.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <span className="text-gray-600 text-sm leading-relaxed">
                          7966132132164
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-starts space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 fill-current" />
                        <span className="text-gray-600 text-sm leading-relative">
                          {hotel.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-green-600 text-2xl  leading-relaxed">
                        ₹{hotel.price}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities?.flat()?.map((item, index) => (
                          <span
                            key={index}
                            className=" bg-blue-100 text-blue-700 px-2 py-1 rounded-lg   "
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteHotel(hotel._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-full cursor-pointer"
                      >
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
