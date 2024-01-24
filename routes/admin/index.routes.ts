import express from 'express';
import adminRoute from '../../routes/admin/admin.routes';
import productRoute from '../../routes/admin/product.routes';
import cartRoute from '../../routes/admin/cart.routes';
import orderRoute from '../../routes/admin/order.routes';
import reviewRoute from '../../routes/admin/review.routes';
const admin = express.Router();

admin.use('/admin', adminRoute);
admin.use('/product', productRoute)
admin.use('/cart', cartRoute);
admin.use('/order', orderRoute);
admin.use('/review', reviewRoute);

export default admin