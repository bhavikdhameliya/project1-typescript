import { Request, Response } from "express";
import ReviewService from "../../service/review.service";
const reviewService = new ReviewService();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
//localhost:2020/api/u1/review/add-review
export const addReivew = async (req:Request,res:Response) => {
    try {
        // const {cartItem, title, rating, productImage} = req.body;

        let isUser = await reviewService.getReview({user: req.user._id, isDelete: false});
        // if(!isUser){
        //     return res.json({message: "You are not login"});
        // }
        // console.log(req.user._id);
        
        let isProduct = await reviewService.getProduct({_id: req.body.cartItem, isDelete: false});
        if(!isProduct){
            return res.json({message: "This product is not found"});
        }

        let productpath: any;
        if(req.file){
            productpath = `${req.file.path}`;
        }
        let review = await reviewService.createReview({
            user: req.user._id,
            ...req.body,
            productImage: productpath,
        })

        let totalScore: any = await reviewService.getAllReview({isDelete: false});
        let reviewLength: number = totalScore.length;
        let rat: any = totalScore.map((item:any) => ({avgrating: item.rating}))
        let total: number = rat.reduce((total: number,val: any)=>total += (val.avgrating),0);
        let avg: number = total/reviewLength;
        // console.log(avg);
        review.save();
        res.json({review, message: "Your review was added"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllReview = async (req:Request,res:Response) => {
    try {
        let allReview = await reviewService.addPopulate({user: req.user._id, isDelete: false});
        let review = allReview.map((item: any) => ({
            _id : item._id ,
            user: req.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            title: item.title,
            productImage : item.cartItem.productImage
        }))
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const specificReivew = async (req:Request,res:Response) => {
    try {
        // const {cartItem} = req.body;
        let allReview = await reviewService.addPopulate({_id: req.body.cartItem, user: req.user._id, isDelete: false});
        if(!allReview){
            return res.json({message: "user does not added review"});
        }
        let review = allReview.map((item: any) => ({
            _id : item._id ,
            user: req.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            title: item.title,
            productImage : item.cartItem.productImage
        }))
        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateReview = async (req: Request,res: Response) => {
    try {
        // const {cartItem, title, reviewId} = req.body;
        let isReview = await reviewService.getReview({_id: req.body.reviewId, cartItem: req.body.cartItem, isDelete: false});
        if (!isReview) {
            return res.status(401).json({ message : "You can not update this review!" });
        }
        isReview = await reviewService.updateReview(
            req.body.reviewId,
            {
                ...req.body
            }
        )
        res.json({isReview, message: "review updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteReview = async (req:Request,res:Response) => {
    try {
        // const {reviewId} = req.body;
        let isUser = await reviewService.getReview({ _id: req.body.reviewId, user: req.user._id, isDelete: false });
        if (!isUser) {
            return res.json({ message: 'You can not delete this review'});
        }
        let review = await reviewService.updateReview(
            req.body.reviewId,
            {
                isDelete: true
            }
        )
        res.json({review, message: "review is deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}