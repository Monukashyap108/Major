import React, { useContext } from 'react'
import { AppContext } from '../content/AppContext'
import {motion} from  'framer-motion'
export default function Hotel() {
  const {hotelData}  = useContext(AppContext)
  return (
    <div className='py-24 max-w-7xl mx-auto'>
         <h1 className='text-3xl font-semibold text-heading my-8 px-2 text-center'>All Hotels</h1>
       
          <div className='flex flex-wrap gap-6 justify-center items-center mt-12  pt-4'>
      
            {
                hotelData.map((item, index)=>(
                      <motion.div
                      className='relative group rounded-lg overflow-hidden cursor-pointer'
                      key = {index}
                      
                      >

                      <img 
                      className='size-70 object-cover object-top'
                      src={`http://localhost:4000/images/${item.image}`} alt="" />
                      <div className='absolute inset-0 flex flex-col justify-end p-4 text-white
                       bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100
            '> 
                <h1 className='text-lg font-medium'>{item.hotelName}</h1>
                <p className='text-sm'>{item.hotelAddress}</p>
                <h1 className='text-lg font-medium'>${item.price}</h1>
                      </div>
                      </motion.div>
                ))
            }
         </div>
       </div>
  )
}
