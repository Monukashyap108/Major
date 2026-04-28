import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
import { hotelsData,roomsData } from "../assets/assets";
export const AppContext = createContext();
const AppContextProvider = ({children}) => {    
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const  [owner,setOwner] = useState(null);
    const [hotelData ,setHotelData] = useState([]);
    const [roomData ,setRoomData] = useState([]);
    const fetchRoomsData =async()=>{
      setRoomData(roomsData);
    }
    const fetchHotelsData =async()=>{
      setHotelData(hotelsData);
    }
    useEffect(  () =>{
   fetchHotelsData();
   fetchRoomsData();
   
}, []);
   const value = {navigate,user,owner,setUser,setOwner,hotelData,roomData};
  return (<AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
  )
}
export default AppContextProvider;