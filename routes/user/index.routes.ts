import express from 'express';
import userRoute from '../../routes/user/user.routes';
import productRoute from '../../routes/user/product.routes';
import cartRoute from '../../routes/user/cart.routes';
import orderRoute from '../../routes/user/order.routes';
import favouriteRoute from '../../routes/user/favourite.routes';
import reviewRoute from '../../routes/user/review.routes';
const user = express.Router();

user.use('/user', userRoute);
user.use('/product', productRoute);
user.use('/cart', cartRoute);
user.use('/order', orderRoute);
user.use('/favourite', favouriteRoute);
user.use('/review', reviewRoute);

export default user;