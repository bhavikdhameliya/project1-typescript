import express from "express";
import { tokenAdmin } from "../../helpers/tokenAdmin";
import { 
    changePassword,
     deleteProfile,
      getProfile,
     updateProfile } 
     from "../../controller/admin/admin.controller"
const adminRoute = express.Router();


adminRoute.get('/get-profile', tokenAdmin, getProfile);
adminRoute.put('/change-password', tokenAdmin, changePassword);
adminRoute.put('/update-profile', tokenAdmin, updateProfile);
adminRoute.delete('/delete-profile', tokenAdmin, deleteProfile);

export default adminRoute

