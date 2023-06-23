const express = require("express");
require('dotenv').config(); 
const cors = require("cors"); 
const app = express();
const UserRouter = require('./Routes/user.route.js');
const {Connection} = require("./Database/db.js");
app.use(express.json()); 
app.use(cors());
app.use('/',UserRouter)
Connection();
app.listen(process.env.PORT, () =>
 console.log(`Server is running successfully on PORT ${process.env.PORT}`)
 ); 