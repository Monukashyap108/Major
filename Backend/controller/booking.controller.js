import Booking from "../modules/booking.module.js"
import Room from "../modules/room.module.js"
import Hotel from "../modules/hotel.module.js"
import User from "../modules/user.module.js"
import nodemailer from "nodemailer"
import transporter from "../config/nodemailer.js"
export const checkAvailability = async ({ room,
    checkInDate,
    checkOutDate, }) => {

    try {
        const booking = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        })
        const isAvailable = booking.length === 0;
        return isAvailable;


    }

    catch (error) {
        console.log("error", error)
    }
}

//api to check availability of room
export const checkRoomAvailability = async (req, res) => {
    try {

        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ room, checkInDate, checkOutDate })
        res.status(200).json({
            success: true,
            isAvailable
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }

}

// api to book a room

export const bookRoom = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        const { room, checkInDate, checkOutDate, paymentMethod, persons } = req.body;
        const isAvailable = await checkAvailability({ room, checkInDate, checkOutDate });
        // before check the availability of room
        if (!isAvailable) {
            return res.status(400).json({ message: "Room is not available", success: false })
        }
        // get total price for the room

        const roomData = await Room.findById(room).populate("hotel");
        // console.log(roomData,"ROomdtaa")
        let totalPrice = roomData.pricePerNight;

        //calculate total price 
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime()
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice = totalPrice * nights * persons;

        const booking = await Booking.create({
            user: id,
            room,
            hotel: roomData.hotel._id,
            checkIn,
            checkOut,
            totalPrice,
            paymentMethod,
            persons,
        })

        const mainOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Room Booking Confirmation",
            html: `
            <h1>Hotel Booking Confirmation</h1>
                 <p>Dear ${user.name},</p>
               
            <h1>Your room has been booked successfully ! Thank you</h1>
            <ul>
                <li>Hotel ID: ${booking._id}</li>
                <li>Hotel Name: ${roomData.hotel.hotelName}</li>
                <li>Room Type: ${roomData.roomType}</li>
                <li>Check-In: ${checkInDate}</li>
                <li>Check-Out: ${checkOutDate}</li>
                <li>Total Price: ${process.env.CURRENCY || "₹ "} ${totalPrice}</li>
            </ul>
            `
        }
        await transporter.sendMail(mainOptions)
        res.json({ success: true, message: "Room Booked Successfully" })

    }
    catch (error) {
        console.log(error,
            "error"
        )
        res.status(500).json({ message: "internal server error" })
    }
}

// api to get all booking for a user 
export const getUserBooking = async (req, res) => {
    try {

        const { id } = req.user;
        const bookings = await Booking.find({ user: id })
            .populate("hotel").populate("room").sort({
                createdAt: -1
            });
        console.log("USER ID:", id);
        console.log("USER ID TYPE:", typeof id);

        const allBookings = await Booking.find({});
        console.log("ALL BOOKINGS:", allBookings.length);
        console.log("FIRST BOOKING USER:", allBookings[0]?.user);  // ✅ ye dekho
        console.log("MATCH?:", allBookings[0]?.user?.toString() === id?.toString());

        res.json({ success: true, bookings })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const { id } = req.user;
        const hotels = await Hotel.find({ owner: id }).select("_id");
        if (!hotels) {
            return res.status(400).json({ message: "hotels Not found", success: false })

        }
        const hotelId = hotels.map((hotel) => hotel._id);
        const bookings = await Booking.find({ hotel: { $in: hotelId } }).populate("hotel ").populate("room")
            .sort({ createdAt: -1 })

        if (!bookings.length) {
            return res.status(400).json({ message: "bookings Not found", success: false })
        }
        else {
            return res.status(200).json({ success: true, bookings })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}