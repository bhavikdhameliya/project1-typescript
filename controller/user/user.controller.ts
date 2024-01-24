import { Request, Response } from 'express';
import bcryptjs from 'bcrypt'
import jwt  from 'jsonwebtoken';
import Userservice from '../../service/user.service';
const userService = new Userservice();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
//api/u1/user/signUp
export const signUp = async (req:Request,res: Response) => {
    try{
        let {name, email, password, confirmPassword, profileImage, isAdmin} = req.body;
        let user = await userService.getUser({email: req.body.email, isDelete: false});
        if(user){
            return res.json({messge: "Email already exists."})
        }

        if(password !== confirmPassword){
            return res.json({messge: "Passwords do not match."});
        }
        const hashedPassword = await bcryptjs.hash(confirmPassword, 8);

        let filepath: any;
        if(req.file){
            filepath = `${req.file.path}`;
        }
        user = await userService.addNewUser({
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


export const login = async (req: Request,res: Response) => {
    try{
        const {email, password} = req.body;
        let user = await userService.getUser({email: req.body.email, isDelete: false});
        if(!user){
            return res.json({message:"User does not exist."});
        }
        let checkPassword = await bcryptjs.compare(password, user.password);
        if(!checkPassword){
            return res.json({message:"Invalid Password."});
        }
        let playload = {
            userId: user._id
        }    
            let token:string = jwt.sign(playload, `${process.env.SECRETE_KEY}`);
            console.log(token);
            
            res.json({token, message: "login successfully"});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getProfile = async (req: Request,res: Response) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

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
        let user = await userService.updateUser(
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

export const updateProfile = async (req: Request,res: Response) => {
    try {
        let {name, email, profileImage} = req.body;
        
        let filepath: any;
        if(req.file){
            filepath = `${req.file.path}`
        }
        let user = await userService.updateUser(
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

export const deleteProfile = async (req: Request,res: Response) => {
    try {
        let user = await userService.updateUser(
            req.user._id,
            {
                isDelete: true
            }
        )
        res.json({user, message: "profile deleted"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}