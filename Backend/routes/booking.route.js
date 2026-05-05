import express from   "express"
import {isAuthenticated } from "../middlewares/isAuthenticated.js"
import {isOwner} from "../middlewares/isOwner.js"
import { checkRoomAvailability,bookRoom ,getUserBooking,getHotelBookings} from "../controller/booking.controller.js"
 const bookingRouter = express.Router();
 bookingRouter.post("/check-availability",checkRoomAvailability);
 bookingRouter.post("/book",isAuthenticated,bookRoom);
 bookingRouter.get("/user",isAuthenticated,getUserBooking);
 bookingRouter.get("/hotel",isOwner,getHotelBookings);
 export default bookingRouter; 