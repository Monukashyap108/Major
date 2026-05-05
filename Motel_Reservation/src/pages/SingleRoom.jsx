import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../content/AppContext";
import toast from "react-hot-toast";
import {
  Image,
  Star,
  Building,
  Utensils,
  Coffee,
  Wifi,
  Car,
  Bath,
  User,
  Tv,
  TreePine,
  Mountain,
  Eye,
  DollarSign,
  MapPin,
  Contact,
  Phone,
  CalendarRange,
  Calendar,
  TableRowsSplit,
} from "lucide-react";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";

export default function SingleRoom() {
  const { roomData, axios, navigate } = useContext(AppContext);
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    persons: 1,
  });
  const { id } = useParams();
  const room = roomData.find((r) => r._id === id);
  if (!room) return <div>Room not found</div>;

  // const onChangeHandler = (e) => {
  //   setBookingData({
  //     ...bookingData,
  //     [e.target.name]: e.target.value,
  //   });
  const onChangeHandler = (e) => {
  const { name, value } = e.target;

  setBookingData({
    ...bookingData,
    [name]: name === "persons" ? Number(value) : value,
  });
 
};
 
  const getAmenityIcon = (amenity) => {
    const iconMap = {
      "Ocean View ": Eye,
      "Mountain View": Mountain,
      "City View": Building,
      "Garden View": TreePine,
      Balcony: Building,
      "Mini Bar": Coffee,
      "Room Service": Utensils,
      "Free Wifi": Wifi,
      "Premium WiFi": Wifi,
      "Free Parking": Car,
      "Work Desk": Building,
      "Concierge Service": User,

      "Breakfast Included": Coffee,
      Parking: Car,
      "Smart Tv": Tv,
      "Spa Access": Bath,
      "Pool Access": Bath,
      Kitchen: Utensils,
      "Living Area": Building,
      "Private Terrace": Building,
      "Butler Sevice": User,
      Jacuzzi: Bath,
      "Panoramic View": Eye,
    };
    return iconMap[amenity] || CheckCircle;
  };

  const checkRoomAvailability = async () => {
  
    try {
          
      if (bookingData.checkIn>= bookingData.checkOut) {
        toast.error("Check in date must be before check out date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: room._id,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
      });
      if (data.success) {
         if(data.isAvailable){
          setIsAvailable(true);
        toast.success("Room is Available");
         }else {
        setIsAvailable(false);
        toast.error("Room is not Available");
      }
      } 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!isAvailable) {
        // toast.error("Room is not available , Please check availability first")
        return checkRoomAvailability() ;
      } else {
        const { data } = await axios.post("/api/bookings/book", {
          room: room._id,
          checkInDate: bookingData.checkIn,
          checkOutDate: bookingData.checkOut,
          persons: bookingData.persons,
          paymentMethod: "Stripe",
        });
        // setIsAvailable(data.isAvailable);
        if (data.success) {
          toast.success("Room booked successfully");
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }; 

  return (
    <div className="py-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* header section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-centergap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800">
                {room.roomType}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5"></MapPin>
                <span>{room.hotel.hotelAddress}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span>{room.hotel.rating}</span>
                </div>
                <div
                  className={`
                      flex items-center gap-2 py-1 rounded-xl text-sm fint-medium 
                      ${
                        room.isAvailable
                          ? "bg-green-100 text-green-800 px-4"
                          : " px-2 bg-red-100 text-red-800"
                      }
                      `}
                >
                  {room.isAvailable ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Available
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> Occupied
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${room.pricePerNight} <span> /night</span>
              </div>
              <div className="text-gray-600">
                <div className="flex item-center gap-2 ">
                  <User className="w-4 h-4 mt-1" />
                  <span>{room.hotel.owner.name}</span>
                </div>
                <div className="flex item-center gap-2 ">
                  <Phone className="w-4 h-4 mt-1" />
                  <span>+9898985689</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* image gallery */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Room Gallery
          </h1>
          <div className=" lg:grid-cols-3 gap-6 grid ">
            <div className="lg:col-span-2 ">
              <img
                src={`http://localhost:4000/images/${room.images[selectedImage]}`}
                alt={`${room.roomType}- Image ${selectedImage + 1}`}
                className="rounded-xl  w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 ">
              {room.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/images/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-24 lg:h-20 object-cover rounded-lg cursor-pointer 
                  transition-all duration-200 ${
                    selectedImage === index
                      ? "ring-4 ring-blue-500 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Room amenties*/}
        <div className="grid lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 ">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Room
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {room.description}
              </p>
            </div>
            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Room Amenities
              </h2>
              <div className="flex flex-wrap gap-4">
                {(Array.isArray(room?.amenities)
                  ? room.amenities.flat()
                  : []
                ).map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-green-600" />
                      )}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hotel Amenties */}
            <div className="bg-white rounded-2xl shadow-lg p-8 ">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Hotel Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(Array.isArray(room?.hotel?.amenities)
                  ? room.hotel.amenities.flat()
                  : []
                ).map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-green-600" />
                      )}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>

              {/* Booking  */}
            </div>
          </div>
          {/* Booking Form */}
          <div className=" lg:col-span-1 ">
            <div className=" bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-600 mb-6">
                Book This Room
              </h2>
              <form onSubmit={onSubmitHandler} className="space-y-4">
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    id="checkIn"
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingData.checkIn}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    id="checkOut"
                    min={bookingData.checkIn}
                    value={bookingData.checkOut}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Guests */}
                <div>
                  <label
                    htmlFor="persons"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Number of Persons
                  </label>
                  <input
                    type="number"
                    name="persons"
                    
                    value={bookingData.persons}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price Per night</span>
                    <span className="text-xl font-bold">
                      ${room.pricePerNight}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 
                    bg-green-600 hover:bg-green-700                   `}
                >
                  {isAvailable ? "Book Now" : "Check Avaialbility"}
                  {/* {checkRoomAvailability} */}
                  {/* {console.log("isAvailable:", isAvailable)} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}