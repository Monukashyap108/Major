import Hotel from "../modules/hotel.module.js"

// registreed new hotel
export const registerHotel = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        const { id } = req.user;

        const {
            hotelName,
            hotelAddress,
            rating,
            price,
            amenities,
        } = req.body;

       const image = req.file ? req.file.filename : null;
        if (
            !hotelAddress || !rating || !price || !amenities || !image || !hotelName
        ) {
            return res.json({
                success: false,
                message: "all feild are required"
            })
        }
        const newHotel = new Hotel({
            hotelName,
            hotelAddress,
            rating,
            price,
            amenities,
            image,
            owner: id
        })
        await newHotel.save();
        return res.status(200).json({
            success: true,
            message: "hotel registered successfully"
        })

    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}


//owner hotel

export const getOwnerHotels = async (req, res) => {
    const { id } = req.user;
    try {
        const hotels = await Hotel.find({ owner: id }).populate("owner", "name email");
        return res.status(200).json({
            hotels, success: true
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

// get all hotels

export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate("owner", "name email");
        return res.status(200).json({
            hotels, success: true
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

//delete hotel
export const deleteHotel = async (req, res) => {
    const { hotelId } = req.params;
    try {

        const deleteHotel = await Hotel.findByIdAndDelete(hotelId);
        if (!deleteHotel) {
            return res.status(200).json({
                success: false,
                message: "hotel not found",
                deleteHotel
            })
        }
        return res.status(200).json({
            success: true,
            message: "hotel deleted successfully",
            deleteHotel
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}
