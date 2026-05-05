import User from "../modules/user.module.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
  

export const signup = async (req, res) => {
    try {
       
        const { name, email, password, role } = req.body;
         
       
        if (!name || !email || !password || !role) {
            return res.json({ message: "All fields are required", success: false });
        }
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.json({ message: "User already exists", success: false });
        }

        const hasshedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            name, email, password: hasshedPassword,
            role,
        })

        await newUser.save();
        return res.json({ message: "User created successfully", success: true });

    }
    catch (error) {
        return res.json({ message: "Internal server error", success: false });
        console.log(error)
    }

}

// login fucntion

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required", success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found", success: false });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid password", success: false });
        }
        const token = jwt.sign(
           {id:user._id, role:user.role},
           process.env.JWT_SECRET,
           {
            expiresIn:"7d",
           }
        );
        res.cookie("token", token, { httpOnly: true,  
             maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ message: "User logged in successfully", success: true,user });
    }
    catch (error) {
        console.log(error)
        return res.json({ message: "Internal server error", success: false });
    }
}


//logout function
 export const logout = async(req,res)=>{
  try{
     res.clearCookie("token");
     return res.json({message:"User logged out successfully",success:true});
  }
  catch(error){
    console.log(error)
    return res.json({message:"Internal server error",success:false});
  }
 } 

 // is-auth function

 export const  isAuth  = async(req,res)=>{
    
    try{
        const  {id} = req.user;
        const user = await User.findById(id).select("-password")
        res.json({success:true,user});
    }
    catch(error){
        return res.json({message:"Internal server error",success:false});
    }

 }