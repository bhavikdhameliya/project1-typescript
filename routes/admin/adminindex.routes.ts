import express from 'express';
import adminRoute from '../../routes/admin/admin.routes';

const admin = express.Router();

admin.use('/admin', adminRoute);

export default admin