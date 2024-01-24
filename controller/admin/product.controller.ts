import { Request, Response } from "express";
import ProductService from "../../service/product.service";
const productService = new ProductService();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}


export const createProduct = async (req: Request ,res: Response) => {
    try {
        let {productName, productPrice, role, productImage} = req.body;
        let product = await productService.getProduct({productName: req.body.productName, isDelete: false});
        if(product){
            return res.json({message: "This Product already exists."});
        }

        let productpath;
        if(req.file){
            productpath = `${req.file.path}`
        }
        product = await productService.createProduct({
            ...req.body,
            admin: req.admin._id,
            productImage: productpath
        })
        product.save();
        res.json({product, message: "product added"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const getAllProduct = async (req: Request,res: Response) => {
    try {
        let product = await productService.getAllProduct({admin: req.admin._id ,isDelete: false});
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const specificProduct = async (req: Request,res: Response) => {
    try {
        const {cartItem} = req.body;
        let product = await productService.getProduct({_id: cartItem, isDelete: false});
        if(!product){
            return res.json({message: "No Such Product Found"});
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateProduct = async (req: Request,res: Response) => {
    try {
        let {productId, productName, productPrice, role, productImage} = req.body;
        let isAdmin = await productService.getProduct({admin: req.admin._id, isDelete: false});
        if(!isAdmin){
            return res.json({message: "you are not admin"})
        }
        let product = await productService.getProduct({_id: req.body.productId, isDelete: false});
        if(!product){
            return res.json({message: "No such product found!"});
        }

        let productpath: any;
        if(req.file){
            productpath = `${req.file.path}`
        }
        
        product = await productService.updateProduct(
            productId,
            {
                ...req.body,
                productImage: productpath
            }
        )
        product.save();
        res.json({product, message: "product updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Interal server error"});
    }
}

export const deleteProduct = async (req: Request,res: Response) => {
    try {
        let {productId} = req.body;
        let product = await productService.getProduct({_id: productId,isDelete: false});
        if(!product){
            return res.json({message: "No Such Product Found"});
        }
        product = await productService.updateProduct(
            productId,
            {
                isDelete: true
            },
        );
        res.json({product, message:"Deleted Successfully!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}