import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import connectDB from"./config/connectDB"
require('dotenv').config();

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app);
initWebRoute(app);

connectDB();

let port = process.env.PORT || 5231 ;
app.listen(port,()=>{
// callback
console.log("Backend NODEJS is runing on the port:" +port)
})