import { Request , Response } from "express";
import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken';
import Userservices from '../../services/user/user.services';
const userServices = new Userservices();

declare global{
    namespace Express{
        interface Request{
            user?:any;
        }
    }
}

//localhost:2020/api/a1/admin/Signup
export const Signup = async (req:Request, res:Response) => {
    try {
    const {name ,email ,password ,confirmpassword  ,profileimage, isAdmin } = req.body; 
    let user = await userServices.getUser({ email: req.body.email, isDelete: false }); 
    if (user) {
        return res.json({ message: 'admin is already exist...' });
    }
    if(password !== confirmpassword){
        return res.json({messge: "Passwords do not match."});
    }
    const hashedPassword = await bcryptjs.hash(confirmpassword, 8);

    let filepath: any;
    if(req.file){
        filepath = `${req.file.path}`;
    }
    user = await userServices.addNewUser({
        ...req.body,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        profileImage: filepath,
        isAdmin
    })
    user.save();
    res.json({user, message: "admin added..."});
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Internal server error"});
}
}

// localhost:2020/api/a1/admin/login
export const login = async (req:Request, res:Response) => {
    try {
    const { email, password } = req.body;
    let user = await userServices.getUser({ email : req.body.email, isDelete: false }); 
    if (!user) {
        return res.json({ message: 'User is not found' });
    }
    let checkPassword = await bcryptjs.compare(password, user.password);
    if(!checkPassword){
        return res.json({message: 'Password is not matched'});
    }
    let playload = {
        userid : user._id
    }
    let secretKey: string | undefined = process.env.SECRET_KEY
    if(playload && secretKey){
         let token = jwt.sign(playload,secretKey)
         res.status(200).json({token, message : 'login sucess'});
       }
     }
    catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Internal Server Error' });
    }
    };