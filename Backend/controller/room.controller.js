import Room from "../modules/room.module.js";
import Hotel from "../modules/hotel.module.js";
// add a new room

export const addRoom = async (req, res) => {
    try {
        const { hotel, roomType, pricePerNight, description, amenities, isAvailable } = req.body;
        const image = req.files?.map((file) => file.filename);
        // const room = new Room({ hotel, roomType, pricePerNight, description, images, amenities, isAvailable });
        const newRoom = await Room.create({
            hotel,
            roomType,
            pricePerNight,
            description,
            images: image,
            amenities,
            isAvailable
        });
        res.status(201).json({ message: "Room added successfully", success: true, room: newRoom });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get owner all rooms

export const getOwnerRooms = async (req, res) => {
    try {
        const { id } = req.user;
        const rooms = await Room.find().populate({
            path: "hotel",
            match: { owner: id },
            select: "hotelName hotelAddress rating  amenities",
        });
       const ownerRooms = rooms.filter(room => room.hotel !== null);
       console.log(ownerRooms);
        res.status(200).json({ success: true, room: ownerRooms });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get user all for rooms

export const getAllRoom = async (req,res) =>{
    try{
        const rooms = await Room.find().populate({
            path:"hotel",
            select:"hotelName hotelAddress rating amenities,owner",
            populate:{
                path:"owner",
                select:"name email",
            }
        }).exec();
        return res.json({success:true,room:rooms});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:error.message});
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const { roomid } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(roomid);
        if(!deletedRoom){
            return res.status(404).json({message:"Room not found",success:false});
        }
        res.status(200).json({ message: "Room deleted successfully", success: true, room:deletedRoom });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

