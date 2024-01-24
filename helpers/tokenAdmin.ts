import userModel from '../model/user/user.model'
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const tokenAdmin = async (req: Request,res: Response,next: NextFunction) => {
    try {
        let token: any = req.headers['authorization']?.split(" ")[1];
            let decode : any = jwt.verify(token, `${process.env.SECRETE_KEY}`);
            let userid :any = decode.userId
            let user = await userModel.findOne({_id:userid, isAdmin: true});
                req.admin = user;
                if(req.admin){
                    next();
                }
                else{
                    res.json({message: "Invalide admin"})
                }
    } catch (error) {
        return res.status(500).json({message: "Invalide admin"})
    }
}