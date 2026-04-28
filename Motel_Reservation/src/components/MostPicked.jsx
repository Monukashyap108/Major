import {motion} from "framer-motion"
import React, { useContext } from 'react'
import { AppContext } from '../content/AppContext'

export default function MostPicked() {
    const {hotelData} = useContext(AppContext)
  return (
    <div className='py-16 mt-12 bg-[#F2EBE0]'>
  <h1 className='text-heading text-3xl font-semibold text-center mx-auto'>Most Picked Hotels</h1>
        <p className='text-paragraph text-[#807f7b] text-sm text-center max-w-lg mx-auto mt-4'>Explore our top-rated row loved bt guests for comfort and location</p>
       
         <div className='flex flex-wrap gap-6 justify-center items-center mt-12  pt-4'>
      
            {
                hotelData.map((item, index)=>(
                      <motion.div
                      className='relative group rounded-lg overflow-hidden cursor-pointer'
                      key = {index}
                      animate={{y:[0,-30,0]}}
                      transition={{duration:2,ease:"easeInOut" ,repeat:Infinity}}
                      >

                      <img 
                      className='size-70 object-cover object-top'
                      src={item.image} alt="" />
                      <div className='absolute inset-0 flex flex-col justify-end p-4 text-white
                       bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100
            '> 
                <h1 className='text-lg font-medium'>{item.name}</h1>
                <p className='text-sm'>{item.address}</p>
                <h1 className='text-lg font-medium'>{item.price}</h1>
                      </div>
                      </motion.div>
                ))
            }
         </div>
        </div>
  )
}
