import userModel from '../../model/user.model';

export default class Userservice{
    getUser = async (body:any)=> {
        return await userModel.findOne(body);
    }

    addNewUser = async (body:any) => {
        return await userModel.create(body);
    }
    updateUser = async (id:string,body:any)=>{
        return await userModel.findByIdAndUpdate(id,{$set:body},{new:true})
    }
}