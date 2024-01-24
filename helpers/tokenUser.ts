import userModel from '../model/user/user.model'
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyToken = async (request: Request,response: Response,next: NextFunction) => {
    try {
       
        let token: any = request.headers['authorization']?.split(" ")[1];
            let decode : any = jwt.verify(token, `${process.env.SECRETE_KEY}`);
            let userid :any = decode.userId
            let user = await userModel.findOne({_id:userid, isAdmin: false});
         
            
            request.user = user;
            if(request.user){
                next();
            }
            else{
                response.json({message: "Invalide user"})
            }
    } catch (error) {
        return response.status(500).json({message: "Invalide token"})
    }
}