import { Request, Response } from "express";
import ProductService from "../../service/product.service";
const productService = new ProductService();

export const showAllProduct = async (req: Request,res: Response) => {
    try {
        let allProduct = await productService.getAllProduct({isDelete: false});
        res.json(allProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const specificProduct = async (req: Request,res: Response) => {
    try {
        const {cartItem} = req.body;
        let product = await productService.getProduct({_id: req.body.cartItem, isDelete: false});
        if(!product){
            return res.json({message:"This Product Is Not Found!"})
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}