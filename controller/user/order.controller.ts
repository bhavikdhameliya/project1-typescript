import { Request, Response } from "express";
import OrderService from "../../service/order.service";
const orderService = new OrderService();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
//localhost:2020/api/u1/order/add-order
export const addOrder = async (req:Request,res:Response) => {
    try {
        let cartItem = await orderService.getAllPopulate({user: req.user._id, isDelete: false});

        let orderItem = cartItem.map((item: any) => ({
            cartItem: item.cartItem._id,
            quntity: item.quntity,
            productPrice: item.cartItem.productPrice,
            productName: item.cartItem.productName,
            productImage: item.cartItem.productImage
        }));

        let totalPrice = orderItem.reduce(((total: number, item: any) => total += (item.quntity * item.productPrice)),0);

        let newOrder = await orderService.createOrder({
            user: req.user._id,
            items: orderItem,
            totalPrice: totalPrice
        });

        newOrder.save();
        await orderService.updateCart(req.user._id, {isDelete: true});
        res.json({newOrder, message: "order added successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getOrder = async (req:Request,res: Response) => {
    try {
        let getorder = await orderService.getAllOrder({user: req.user._id, isDelete: false});
        if(!getorder){
            return res.status(401).json({message:"No Order Found!"})
        }
        res.json(getorder);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteOrder = async (req:Request,res: Response) => {
    try {
        let order = await orderService.updateOrder(
            req.user._id,
            {
                isDelete: true
            }
        )
        res.json({message: "order deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}