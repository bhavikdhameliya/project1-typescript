import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv"
import user from './routes/user/index.routes'
import admin from'./routes/admin/index.routes'

dotenv.config()

const server = express()
const port :number | undefined | any = Number(process.env.PORT || 3000)

server.use(morgan('dev'))
server.use(express.json());

server.use('/api/u1' , user);
server.use('/api/a1' , admin);

async function main(){
    await mongoose.connect(`${process.env.MONGO_DB_URL}`);
}
main().then(()=>{
    console.log('DB is connected...'); 
}).catch((err)=>{
    console.log(err);
}); 

server.listen(port,()=>console.log(`server conncted local host:${port}`))
