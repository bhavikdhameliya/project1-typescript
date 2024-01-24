import { Request, Response } from "express";
import OrderService from "../../service/order.service";
const orderService = new OrderService();

export const showAllOrder = async (req:Request,res: Response) => {
    try {
        let order = await orderService.getAllOrder({isDelete: false});
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const specificOrder = async (req:Request,res: Response) => {
    try {
        // const {orderId} = req.body;
        let order = await orderService.getOneOrder({_id: req.body.orderId , isDelete: false});
        if(!order){
            return res.json({message:"your order not found"});
        }
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Inrernal Server Error"});
    }
}