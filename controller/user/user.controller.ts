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

//localhost:2020/api/u1/user/signUp
export const Signup = async (req:Request, res:Response) => {
    try {
    const {name ,email ,password ,confirmpassword  ,profileimage, isAdmin } = req.body; 
    let user = await userServices.getUser({ email: req.body.email, isDelete: false }); 
    if (user) {
        return res.json({ message: 'User is already exist...' });
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
    })
    user.save();
    res.json({user, message: "user added..."});
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Internal server error"});
}
}

// localhost:2020/api/u1/user/login
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
    
    // localhost:2020/api/u1/user/get-profile
    export const getProfile = async (req: Request,res: Response) => {
        try {
            res.json(req.user);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal server error"});
        }
    }

   //localhost:2020/api/u1/user/change-password
    export const changePassword = async (req: Request,res: Response) => {
        try {
            let {password, newPassword, confirmPassword} = req.body;
            let checkPassword = await bcryptjs.compare(password, req.user.password);
            
            if (!checkPassword) {
                return res.json({message: 'Incorrect current password'})
            }
            if (newPassword !== confirmPassword) {
                return res.json({message:'New password and Confirm password do not match.'})
            }
            let hashedPassword = await bcryptjs.hash(confirmPassword, 10);
            let user = await userServices.updateUser(
                req.user._id,
                {
                    password: hashedPassword,
                    confirmPassword: hashedPassword
                }
            )
            // user.save();
            res.json({message: "password update successfully"})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal server error"});
        }
    }

    //localhost:2020/api/u1/user/update-profile
    export const updateProfile = async (req: Request,res: Response) => {
        try {
            let {name, email, profileImage} = req.body;
            
            let filepath: any;
            if(req.file){
                filepath = `${req.file.path}`
            }
            let user = await userServices.updateUser(
                req.user._id,
                    {
                        ...req.body,
                        profileImage: filepath,
                    }
            )
            res.json({user, message: "profile changed successfully"});
        } catch (err) {
            console.log(err);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
    
    //localhost:2020/api/u1/user/delete-profile
    export const deleteProfile = async (req: Request,res: Response) => {
        try {
            let user = await userServices.updateUser(
                req.user._id,
                {
                    isDelete: true
                }
            )
            res.json({user, message: "profile deleted"});
        } catch (err) {
            console.log(err);
            res.status(500).json({message:"Internal Server Error"});
        }
    }
    