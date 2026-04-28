import React, { useContext } from 'react'
import { AppContext } from '../content/AppContext'
import RoomCard from '../components/RoomCard'
export default function Rooms() {
  const {roomData} = useContext(AppContext)
  return (
    <div className='py-24 max-w-7xl  mx-auto'>
      <h1 className='text-3xl font-semibold text-heading px-2 text-center my-8'> AllRooms</h1>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12 '> 
             {roomData.map((room)=>( 
               <RoomCard room={room} key = {room._id}/>
             ))}  
               </div>
      </div>
  )
}
