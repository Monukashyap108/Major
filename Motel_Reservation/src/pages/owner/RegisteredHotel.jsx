import React, { useContext } from "react";
import { useState } from "react";
import { AppContext } from "./../../content/AppContext.jsx";
import toast from "react-hot-toast";
export default function RegisteredHotel() {
  const { axios, navigate } = useContext(AppContext);
  const [data, setData] = useState({
    hotelName: "",
    hotelAddress: "",
    rating: "",
    price: "",
    amenities: [],
    image: null,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  // const [fileSize, setFileSize] = useState(null)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setData({ ...data, image: selectedFile });
    if (selectedFile.size) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotelName", data.hotelName);
    formData.append("hotelAddress", data.hotelAddress);
    formData.append("rating", data.rating);
    formData.append("price", data.price);
    formData.append("amenities", JSON.stringify(data.amenities));
    formData.append("image", file);
    console.log(data);
    try {
      const { data } = await axios.post("/api/hotel/register", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Hotel Image</p>
          <div className="w-full my-4">
            {/* hotel image */}

            {preview && (
              <div className="mb-3 flex justify-center">
                <img
                  src={preview}
                  alt=""
                  className=" border w-24 h-24 object-cover shadow rounded"
                />
              </div>
            )}
            {/* file upload  */}
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 
  file:mr-4  file:py-2  file:px-4  file:rounded-full 
  file:border-0 
  file:text-sm  file:bg-blue-50 file:text-blue-700
   hover:file:bg-blue-100 cursor-pointer
  "
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Hotel Name
          </label>
          <input
            name="hotelName"
            value={data.hotelName}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Hotel Address
          </label>
          <textarea
            name="hotelAddress"
            value={data.hotelAddress}
            onChange={handleChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={data.rating}
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
              price
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium"
              htmlFor="product-amenities"
            >
              Amenities
            </label>
            <input
              type="text"
              name="amenities"    
              value={data.amenities}
              onChange={handleChange}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              // 5:21:42 changes to do for the amenities
            />
          </div>
        </div>
        <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer">
          Register Hotel
        </button>
      </form>
    </div>
  );
}
