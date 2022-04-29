const express=require("express");
const app=express();
const cors=require('cors');
const routesHandler = require('./routes/handler.js');
const port = process.env.PORT || 5000;





app.use(cors()); 
app.use(express.json());
app.use('/', routesHandler);





app.listen(port,function(){console.log("express server is running");})