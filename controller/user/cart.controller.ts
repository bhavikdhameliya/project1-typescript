import { Request, Response } from "express";
import CartServicce from "../../service/cart.service";
// import mongoose from "mongoose";
const cartService = new CartServicce();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
//localhost:2020/api/u1/cart/add-cart
export const addToCart = async (req: Request,res: Response) => {
    try {
        // const { cartItem,quntity} = req.body;
        let isCart = await cartService.getCart({cartItem: req.body.cartItem, user: req.user._id, isDelete: false});
        if(isCart){
            return res.json({message: "This product is already added in cart"});
        }

        isCart = await cartService.createCart({
            ...req.body,
            user: req.user._id
        })
        isCart.save();
        res.json({isCart, message: "Product added in cart"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllCart = async (req: Request,res: Response) => {
    try {
        let allCart = await cartService.getAllCart({user: req.user._id, isDelete: false});
        let cart = allCart.map((item: any) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity,
            isDelete: item.isDelete
        }))
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const specificCart = async (req: Request,res: Response) => {
    try {
        const {cartItem} = req.body;
        let cart = await cartService.getAllCart({cartItem: req.body.cartItem, isDelete: false});
        if(!cart){
            return res.json({message:"No data found"})
        }
        let allcart = cart.map((item: any) => ({
            _id : item._id ,
            user: req.user._id,
            cartItem: item.cartItem._id,
            productName : item.cartItem.productName,
            productImage : item.cartItem.productImage,
            productPrice : item.cartItem.productPrice,
            quantity : item.quntity,
            isDelete: item.isDelete
        }))
        res.json(allcart);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateCart = async (req:Request,res: Response) => {
    try {
        let {cartItem, quntity} = req.body;
        let cart = await cartService.getCart({user: req.user._id, isDelete: false});
        cart = await cartService.getCart({cartItem: req.body.cartItem, isDelete: false});
        if(!cart){
            return res.json({message: "This product not found"});
        }
        console.log(req.body);
        
        
        cart = await cartService.updateCart(
            req.body.cartItem,
            {
                ...req.body
            }
        )
        // cart.save();
        res.json({message: "cart updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteCart = async (req:Request,res:Response) => {
    try {
        const {cartItem} = req.body;
        let isCart = await cartService.getCart({user: req.user._id, isDelete: false});
        isCart = await cartService.getCart({cartItem: cartItem, isDelete: false});
        if(!isCart){
            return res.json({message: 'No data found!'})
        }
        isCart = await cartService.updateCart(
            req.body.cartItem,
            {
                isDelete: true
            }
        )
        res.json({message: "Cart item deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}