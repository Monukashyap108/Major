 import React , { useContext } from 'react'
import { AppContext } from '../content/AppContext'
 import { motion } from 'framer-motion'
 import { roomsData } from '../assets/assets'
 export default function RoomCard( {room }) {
     const {navigate} =useContext(AppContext)
   return (
     <motion.div
     whileHover ={{scale:1.1}} 
     transition={{duration:0.2,type:"tween",ease:"easeInOut"}}>

    <div
    className='rounded-xl shadow-xl overflow-hidden transition-transform duration 
    ease-out max-w-84 bg-white px-2 md:px-5 ml-5 mt-3'
    >
        <img src={room.images[0]} 
        className='w-full h-52 object-cover rounded-xl mt-2'
        alt="" />
        <h1 className='mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-heading'>{room.roomType}</h1>
         <div  className = "flex items-center gap-2 justify-between">
            <p className='text-sm px-4 text-gray-600'>${room.pricePerNight}/per Night</p>
            <button 
            onClick={()=>{
            navigate(`/single/${room._id}`)
            window.scrollTo({top:0, behavior:"smooth"})
            }}
            className='bg-[#C6BB9C] text-white rounded-md py-1 mb-3 px-4 mt-2 cursor-pointer'>See Details</button>
         </div>
    </div>

     </motion.div>
   )
 }
 