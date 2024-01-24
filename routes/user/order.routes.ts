import express from 'express';
import { verifyToken } from '../../helpers/tokenUser';
import { addOrder, deleteOrder, getOrder } from '../../controller/user/order.controller';
const orderRoute = express.Router();

orderRoute.post('/add-order', verifyToken, addOrder);
orderRoute.get('/get-order', verifyToken, getOrder);
orderRoute.delete('/delete-order', verifyToken, deleteOrder);
;
export default orderRoute