import mongoose from "mongoose";
const hotelRoomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    roomType: {
        type: String,
        required: true,
        trim: true,

    },
    pricePerNight: {
        type: Number,
        required: true,
        trim: true,

    },
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images:
    {
        type: [String],
        required: true,
    }
    ,
   amenities: {
  type: [String],
  required: true
},
    isAvailable: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true })

const Room = mongoose.model("Room", hotelRoomSchema);

export default Room;  