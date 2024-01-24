import cartModel from "../model/user/cart.model";
import mongoose from "mongoose";

export default class CartServicce{
    getCart = async (body:any) => {
        return await cartModel.findOne(body)
    }

    getAllCart = async (body: any) => {
        return await cartModel.find(body).populate('cartItem')
    }

    showAllCart = async (body: any) => {
        return await cartModel.find(body).populate('cartItem').populate('user')
    }

    createCart = async (body:any) => {
        return await cartModel.create(body)
    }

    updateCart = async (item:any,body: any) => {
        return await cartModel.findOneAndUpdate({cartItem: item},{$set: body}, {new: true});
    }
}