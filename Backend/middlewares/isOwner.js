export const isOwner = async (req, res, next) => {
    try {
         if(req.user && req.user.role==="owner"){
            next()
         }else{
            return res.status(401).json({message:"Unauthorized",success:false})
         }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}