import productModel from "../model/admin/product.model";
import reviewModel from "../model/user/review.model";

export default class ReviewService{
    getReview =async (body:any) => {
        return await reviewModel.findOne(body)
    }

    getProduct =async (body:any) => {
        return await productModel.findOne(body)
    }

    getAllReview =async (body:any) => {
        return await productModel.find(body)
    }

    createReview =async (body:any) => {
        return await reviewModel.create(body)
    }

    addPopulate =async (body:any) => {
        return await reviewModel.find(body).populate('cartItem').populate('user');
    }

    updateReview =async (id: any,body:any) => {
        return await reviewModel.findByIdAndUpdate(id, {$set: body}, {new:true});
    }
}