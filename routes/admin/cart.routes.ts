import express from 'express'
import { tokenAdmin } from '../../helpers/tokenAdmin';
import { showAllCart, showCart } from '../../controller/admin/cart.controller';
const cartRoute = express.Router();

cartRoute.get('/showall-cart', tokenAdmin, showAllCart);
cartRoute.get('/show-cart', tokenAdmin, showCart);

export default cartRoute