import React, { useContext } from 'react'
import { AppContext } from '../content/AppContext'
import RoomCard from './RoomCard'
export default function PopularRooms() {
    const {roomData} = useContext(AppContext)
  return (
    <div className='py-15 bg-[#F2EBE0]'>
        <h1 className='text-heading text-3xl font-semibold text-center mx-auto'>Popular Rooms</h1>
        <p className='text-paragraph text-[#807f7b] text-sm text-center max-w-lg mx-auto mt-4'>Explore our top-rated row loved bt guests for comfort and location</p>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-w-7xl mx-auto mt-12 '> 
{roomData.map((room)=>( 
  <RoomCard room={room} key = {room._id}/>
))}  
  </div>
          
    </div>
  )
}
