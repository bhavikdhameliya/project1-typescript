import { Request, Response } from "express";
import FavouriteService from "../../service/favourite.service";
const favouriteService = new FavouriteService();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
//localhost:2020/api/u1/favourite/add-fav
export const addToFavourite = async (req:Request,res:Response) => {
    try {
        // const {cartItem} = req.body;
        let isFavourite = await favouriteService.getFavourite({cartItem: req.body.cartItem, isDelete: false});
        if(isFavourite){
            return res.json({message: "This product is already added in favourite list"});
        }

        let favourite = await favouriteService.createFavourite({
            user: req.user._id,
            ...req.body
        })
        favourite.save();
        res.json({favourite, message: "product is added in your faourite list"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllFavourite = async (req:Request,res:Response) => {
    try {
        let allFavourite = await favouriteService.getPopulate({user: req.user._id, isDelete: false});
        let favourite = allFavourite.map((item: any) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
        }))
        res.json(favourite);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const specificFavourite = async (req:Request,res:Response) => {
    try {
        const {cartItem} = req.body
        let allFavourite = await favouriteService.getPopulate({cartItem: req.body.cartItem, isDelete: false});
        if(!allFavourite){
            return res.json({message:"No data found"})
        }
        let favourite = allFavourite.map((item: any) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
        }))
        res.json(favourite);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteFavourite = async (req:Request,res: Response) => {
    try {
        // const {cartItem} = req.body;
        let isFavourite = await favouriteService.getFavourite({user: req.user._id, isDelete: false});
        isFavourite = await favouriteService.getFavourite({cartItem: req.body.cartItem, isDelete: false});
        if(!isFavourite){
            return res.json({message: "This product does not found in your favourite list"});
        }
        isFavourite = await favouriteService.updateFavourite(
            req.body.cartItem,
            {
                isDelete: true
            }
        )
        res.json({message: "This product removed in your favourite list"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}