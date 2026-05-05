import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDB } from "./config/connectDB.js"
import userRouter from "./routes/user.routes.js"
import hotelRouter from "./routes/hotel.routes.js"
import roomRouter from "./routes/room.routes.js"
import bookingRouter  from "./routes/booking.route.js"

dotenv.config()
const app = express();

// connect database
connectDB();
// middlewares
app.use(express.json());
app.use(cors
    ({
        origin: "http://localhost:5173",
        credentials: true
    }));
app.use(cookieParser())

// API ENDPOINTS
app.get("/", (req, res) => {
    res.send("Hello world from server")
})
app.use("/images", express.static("upload"))
app.use("/api/user", userRouter)
app.use("/api/hotel", hotelRouter)
app.use("/api/room", roomRouter)
app.use("/api/bookings", bookingRouter)
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port no : ${PORT}`);

})