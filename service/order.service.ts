import orderModel from "../model/user/order.model";
import cartModel from "../model/user/cart.model";

export default class OrderService {
    getAllPopulate = async (body:any) => {
        return await cartModel.find(body).populate('cartItem')
    }

    createOrder = async (body:any) => {
        return await orderModel.create(body);
    }

    updateCart = async (item: any,body:any) => {
        return await cartModel.updateMany({user: item}, {$set: body}, {new: true});
    }

    updateOrder = async (item: any,body:any) => {
        return await orderModel.updateOne({user: item}, {$set: body}, {new: true});
    }

    getAllOrder =async (body:any) => {
        return await orderModel.find(body);
    }

    getOneOrder =async (body:any) => {
        return await orderModel.findOne(body);
    }
}