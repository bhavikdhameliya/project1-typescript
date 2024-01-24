import { Request, Response } from "express";
import ReviewService from "../../service/review.service";
const reviewService = new ReviewService();

export const showAllReview = async (req:Request,res:Response) => {
    try {
        let allReview = await reviewService.addPopulate({isDelete: false});
        let review = allReview.map((item: any) => ({
            _id : item._id ,
            user: item.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            title: item.title,
            productImage : item.cartItem.productImage
        }))
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const showReview = async (req:Request,res:Response) => {
    try {
        let allReview = await reviewService.addPopulate({_id: req.body.reviewId, isDelete: false});
        if(!allReview){
            return res.json({message: "review not found!"});
        }
        let review = allReview.map((item: any) => ({
            _id : item._id ,
            user: item.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            title: item.title,
            productImage : item.cartItem.productImage
        }))
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}
