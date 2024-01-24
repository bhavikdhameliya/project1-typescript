import express from "express";
import { verifyToken } from "../../helpers/tokenUser";
import { addToFavourite, deleteFavourite, getAllFavourite, specificFavourite } from "../../controller/user/favourite.controller";
const favouriteRoute = express.Router();

favouriteRoute.post('/add-fav', verifyToken, addToFavourite);
favouriteRoute.get('/getall-fav', verifyToken, getAllFavourite);
favouriteRoute.get('/get-fav', verifyToken, specificFavourite);
favouriteRoute.delete('/delete-fav', verifyToken, deleteFavourite);

export default favouriteRoute