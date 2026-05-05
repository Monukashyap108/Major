import React from "react";
import { useState, useEffect } from "react";
import { hotelsData } from "../../assets/assets";
import { useContext } from "react";
// import { AppContext } from "../../content/Context";
import toast from "react-hot-toast";
import { AppContext } from "../../content/AppContext";

export default function AddRoom() {
  const { axios, navigate } = useContext(AppContext);
  const [roomData, setRoomData] = useState({
    hotel: "",
    roomType: "",
    pricePerNight: "",
    description: "",
    image: [],
    amenities: [],
    isAvailable: true,
  });

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

 const handleChange = (e) => {
  const { name, type, value, checked } = e.target;

  setRoomData({
    ...roomData,
    [name]: type === "checkbox" ? checked : value,
  });
};
  const handleImageChange = (e, index) => {
    const files = e.target.files[0];
    if (files) {
      const updatedImage = [...roomData.image];
      updatedImage[index] = files;
      setRoomData({ ...roomData, image: updatedImage });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roomData);
    const formData = new FormData();
    formData.append("hotel", roomData.hotel);
    formData.append("roomType", roomData.roomType);
    formData.append("pricePerNight", roomData.pricePerNight);
    formData.append("description", roomData.description);
    formData.append("amenities", JSON.stringify(roomData.amenities.split(",")));
    formData.append("isAvailable", roomData.isAvailable);
    roomData.image.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const { data } = await axios.post("/api/room/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/owner/all-rooms");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to upload room");
    }
  };
  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium ">Room Images</p>
          <div className=" flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`} className="">
                  {/* this are all for image uploading section */}
                  <input
                    type="file"
                    id={`image${index}`}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    hidden
                  />
                  <img
                    className=" max-w-24 rounded-md cursor-pointer "
                    src={
                      roomData.image[index]
                        ? URL.createObjectURL(roomData.image[index])
                        : null
                    }
                    alt="upload"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Room Type
          </label>
          <input
            name="roomType"
            value={roomData.roomType}
            onChange={handleChange}
            type="text"
            placeholder="Executive Room, Deluxe Room, Standard Room"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Room description
          </label>
          <input
            name="roomDescription"
            value={roomData.description}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div> */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Room Description
          </label>
          <textarea
            name="description"
            value={roomData.description}
            onChange={handleChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              pricePer Night
            </label>
            <input
              type="number"
              name="pricePerNight"
              value={roomData.pricePerNight}
              onChange={handleChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Room Amenities
            </label>
            <textarea
              type="text"
              name="amenities"
              value={roomData.amenities}
              onChange={handleChange}
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
              // 5:21:42 changes to do for the amenities
            ></textarea>
          </div>
        </div>
        {/* <div className="flex items-center gap-5 flex-wrap"> */}

        <div className="flex flex-col gap-1 flex-1 w-full">
          <label htmlFor="">Select Hotel</label>
          <select
            name="hotel"
            value={roomData.hotel}
            onChange={handleChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Hotel</option>
            {hotelData.map((item) => (
              <option key={item._id} value={item._id}>
                {item.hotelName}
              </option>
            ))}
          </select>
        </div>

        {/* </div> */}

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 flex-wrap w-32">
            <label htmlFor="" className="text-base font-medium ">
              isAvailable
            </label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={roomData.isAvailable}
              onChange={ handleChange}
              
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 ml-2"
              required
            />
          </div>
        </div>

        <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer">
          Add Hotel
        </button>
      </form>
    </div>
  );
}
