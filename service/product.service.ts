import productModel from "../model/admin/product.model";

export default class ProductService{
    getProduct = async (body: any) => {
        return await productModel.findOne(body)
    }

    createProduct = async (body: any) => {
        return await productModel.create(body)
    }

    getAllProduct = async (body: any) => {
        return await productModel.find(body)
    }

    updateProduct = async (id: string, body: any) => {
        return await productModel.findByIdAndUpdate(id, {$set: body}, {new: true})
    }
}