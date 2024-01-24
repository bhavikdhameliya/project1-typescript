import { Request, Response } from "express";
import bcryptjs from 'bcrypt'
import Userservice from "../../service/user.service";
const userService = new Userservice();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}


export const getProfile = async (req: Request,res: Response) => {
    try {
        res.json(req.admin);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

export const changePassword = async (req: Request,res: Response) => {
    try {
        let {password, newPassword, confirmPassword} = req.body;
        let checkPassword = await bcryptjs.compare(password, req.admin.password);
        
        if (!checkPassword) {
            return res.json({message: 'Incorrect current password'})
        }
        if (newPassword !== confirmPassword) {
            return res.json({message:'New password and Confirm password do not match.'})
        }
        let hashedPassword = await bcryptjs.hash(confirmPassword, 10);
        let user = await userService.updateUser(
            req.admin._id,
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

export const updateProfile = async (req: Request,res: Response) => {
    try {
        // let {name, email, profileImage} = req.body;
        
        let filepath: any;
        if(req.file){
            filepath = `${req.file.path}`
        }
        console.log(req.admin._id);
        
        let user = await userService.updateUser(
            req.admin._id,
                {
                    ...req.body,
                    profileImage: filepath,
                }
        )
        // user.save();
        res.json({user, message: "profile changed successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const deleteProfile = async (req: Request,res: Response) => {
    try {
        let user = await userService.updateUser(
            req.admin._id,
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