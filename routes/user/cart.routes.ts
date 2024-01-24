import express from 'express';
import { verifyToken } from '../../helpers/tokenUser';
import { addToCart, deleteCart, getAllCart, specificCart, updateCart } from '../../controller/user/cart.controller';
const cartRoute = express.Router();

cartRoute.post('/add-cart', verifyToken, addToCart);
cartRoute.get('/getall-cart', verifyToken, getAllCart);
cartRoute.get('/get-cart', verifyToken, specificCart);
cartRoute.put('/update-cart', verifyToken, updateCart);
cartRoute.delete('/delete-cart', verifyToken, deleteCart);

export default cartRoute