import favouriteModel from "../model/user/favourite.model";
import mongoose from "mongoose";

export default class FavouriteService{
    getFavourite =async (body:any) => {
        return await favouriteModel.findOne(body)
    }

    createFavourite =async (body:any) => {
        return await favouriteModel.create(body)
    }

    getPopulate =async (body:any) => {
        return await favouriteModel.find(body).populate('cartItem');
    }

    updateFavourite =async (item:any, body:any) => {
        return await favouriteModel.updateOne({cartItem: item}, {$set: body}, {new: true});
    }
}