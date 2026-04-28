import { Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Rooms from './pages/Rooms'
import Hotel from './pages/Hotel'
import  MyBooking from './pages/MyBooking' 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import  SingleRoom from './pages/singleRoom'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { AppContext } from './content/AppContext'
import OwnerLayout from './pages/owner/OwnerLayout'
import AllHotels from './pages/owner/AllHotels'
import RegisteredHotel from './pages/owner/RegisteredHotel'
import AllRooms from './pages/owner/AllRooms'
import AddRoom from './pages/owner/AddRoom'
import Bookings from './pages/owner/Bookings'
 
function App() {
  const ownerPath = useLocation().pathname.includes('/owner')
  const {owner} = useContext(AppContext) 
  return (
    <div className='w-full  '>
      <Toaster/>    
     {!ownerPath && <Navbar/>}
     <Routes>
      <Route  path='/' element ={<Home/>}/> 
      <Route  path='/about' element ={<About/>}/>
      <Route  path='/login' element ={<Login/>}/> 
      <Route  path='/signup' element ={<Signup/>}/> 
      <Route  path='/rooms' element ={<Rooms/>}/> 
      <Route  path='/hotel' element ={<Hotel/>}/> 
      <Route  path='/single/:id' element ={<SingleRoom/>}/> 
      <Route  path='/my-bookings' element ={<MyBooking/>}/> 
       
   <Route path="/owner" element={owner ? <OwnerLayout/> : <Login/>}>
    <Route index element={<AllHotels/>} />                    
    <Route path="register-hotel" element={<RegisteredHotel/>} />
    <Route path="all-rooms" element={<AllRooms/>} />          
    <Route path="add-room" element={<AddRoom/>} />            
    <Route path="bookings" element={<Bookings/>} />          
  </Route>
       
     </Routes>
       {!ownerPath && <Footer/>}
     
    </div> 
  )
} 

export default App
