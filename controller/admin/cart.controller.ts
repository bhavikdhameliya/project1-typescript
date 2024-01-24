import { Request, Response } from "express";
import CartServicce from "../../service/cart.service";
import mongoose from "mongoose";
const cartService = new CartServicce();

export const showAllCart = async (req: Request,res: Response) => {
    try {
        let allCart = await cartService.showAllCart({isDelete: false});
        let cart = allCart.map((item: any) => ({
            user: item.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity
        }))
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const showCart = async (req: Request,res: Response) => {
    try {
        // const {cartItem} = req.body
        let allCart = await cartService.showAllCart({cartItem: req.body.cartItem,isDelete: false});
        let cart = allCart.map((item: any) => ({
            user: item.user._id,
            name: item.user.name,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity
        }))
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}