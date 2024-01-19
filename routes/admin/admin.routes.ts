import express from "express";
import { verifyToken } from "../../helpers/verifytoken";
import { Signup, login } from "../../controller/admin/admin.controller";
const adminRoute = express.Router();

adminRoute.post('/Signup', Signup);
adminRoute.post('/login',  login);


export default adminRoute