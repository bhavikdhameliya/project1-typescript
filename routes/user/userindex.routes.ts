import express from 'express';
import userRoute from '../../routes/user/user.routes';

const user = express.Router();

user.use('/user', userRoute);


export default user;