import React ,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../content/AppContext";
import toast from "react-hot-toast";
export default function Login() {
     const {setUser,navigate,setOwner,axios} = useContext(AppContext);  
    const [formdata , setFormdata] = useState({
    email:"",
    password:""
  })  
 const onChangeHandler = (e) =>{
  setFormdata({
    ...formdata,
    [e.target.name]: e.target.value
  })
 }
  const submitHandler = async(e) =>{
    e.preventDefault();
    // setUser(true)  at 4.35
     try{
         const {data} = await axios.post("/api/user/login",formdata)

         if(data.success){
         toast.success(data.message);
         if(data.user.role==="owner"){
          setOwner(true);
          navigate("/owner")
         }
         else{
          setUser(true);
          navigate("/")
         }
        }
         else
         {
          toast.error(data.message)
           
         }
        
     }
     catch(error){
        toast.error(error.response.data.message)
     }
   
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#92918D" }}
    >
      <form
      onSubmit={submitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8  py-20 w-80 sm:w-[352px] rounded-lg shadow-xl border"
        style={{
          background: "#ffffff",
          borderColor: "#e0d5c0",
          color: "#6b5a3e",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* Title */}
        <p
          className="text-2xl m-auto tracking-wide"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#1a1209",
          }}
        >
          <span style={{ color: "#b8943f" }}>User</span>{" "}
          Login
        </p>

        {/* Divider */}
        <div
          className="mx-auto"
          style={{ width: 48, height: 1, background: "#b8943f" }}
        />

        {/* Email Field */}
        <div className="w-full">
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ color: "#6b5a3e" }}
          >
            Email
          </p>
          <input
            onChange={onChangeHandler}
            name = "email" 
            value={formdata.email}
            placeholder="your@email.com"
            className="w-full p-2 rounded mt-1 text-sm outline-none transition-all"
            style={{
              border: "1.5px solid #c8bfb0",
              background: "#faf8f5",
              color: "#1a1209",
            }}
             
            type="email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ color: "#6b5a3e" }}
          >
            Password
          </p>
          <input
            onChange={onChangeHandler}
            name = "password" 
            value={formdata.password}
            placeholder="••••••••"
            className="w-full p-2 rounded mt-1 text-sm outline-none transition-all"
            style={{
              border: "1.5px solid #c8bfb0",
              background: "#faf8f5",
              color: "#1a1209",
            }}
          
            type="password"
            required
          />
        </div>

        {/* Toggle Login / Register */}
       
          <p className="text-xs" style={{ color: "#8a7a60" }}>
            Don't have an account?{" "}
            <span
        
              className="cursor-pointer transition-colors"
              style={{ color: "#b8943f" }}
              
            >
           <Link to="/signup">
              Create one here
              </Link>
            </span>
          </p>
 

        {/* Submit Button */}
        <button
          className="w-full py-2 rounded-sm text-white text-xs uppercase tracking-widest transition-all cursor-pointer"
          style={{ background: "#b8943f", letterSpacing: "0.15em" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
