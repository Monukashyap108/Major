import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hotelsData, roomsData } from "../assets/assets";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);
  const [hotelData, setHotelData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const checkUserLoggedInOrNot = async()=>{
    try{
    const {data} = await  axios.get("/api/user/is-auth");
    // console.log(data)
    if(data.success){
      setUser(data.user)
      if (data.user.role === "owner") {
        setOwner(data.user);
      }
    }

    }catch(error){
            console.log(error)
    }
  }
  const fetchRoomsData = async () => {
 try{
      const  {data} = await axios.get('/api/room/get-all');
      if(data.success){
        setRoomData(data.room)
    
      }else{
        toast.error(data.message)
      }

      
    }catch(error){
    toast.error(
    error?.response?.data?.message || error.message || "Something went wrong"
  );
    }
  };
  const fetchHotelsData = async () => {
    try{
      const  {data} = await axios.get("/api/hotel/get-all")
      if(data.success){
        setHotelData(data.hotels)
      }else{
        toast.error(data.message)
      }
    }
      catch(error){
        toast.error(error.message)
      }

    
    
  };
  useEffect(() => {
    fetchHotelsData();
    fetchRoomsData();
    checkUserLoggedInOrNot();
  }, []);
  const value = {
    navigate,
    user,
    owner,
    setUser,
    setOwner,
    hotelData,
    roomData,
    axios,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
