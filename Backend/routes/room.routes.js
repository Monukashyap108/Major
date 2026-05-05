import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {isOwner} from "../middlewares/isOwner.js"
import {addRoom,getOwnerRooms,getAllRoom,deleteRoom} from "../controller/room.controller.js"
import { upload } from "../config/multer.js";
 const roomRouter = express.Router();
roomRouter.post(
  "/add",
  isAuthenticated,
  isOwner,
  upload.array("images"),  
addRoom
); roomRouter.get("/get",isAuthenticated,isOwner,getOwnerRooms);
 roomRouter.get("/get-all",getAllRoom);
 roomRouter.delete("/delete/:roomid",isAuthenticated,isOwner,deleteRoom);
export default roomRouter;