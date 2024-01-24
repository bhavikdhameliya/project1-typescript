import express from "express";
import { tokenAdmin } from "../../helpers/tokenAdmin";
import { createProduct, deleteProduct, getAllProduct, specificProduct, updateProduct} from "../../controller/admin/product.controller"
import upload from "../../helpers/imageUpload";
const productRoute = express.Router();

productRoute.post('/add-product', upload.single('productImage'), tokenAdmin, createProduct);
productRoute.get('/getall-product', tokenAdmin, getAllProduct);
productRoute.get('/get-product', tokenAdmin, specificProduct);
productRoute.put('/update-product', upload.single('productImage'), tokenAdmin, updateProduct);
productRoute.delete('/delete-product', tokenAdmin, deleteProduct);

export default productRoute