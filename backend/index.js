const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Connection } = require('./Database/db.js');
dotenv.config();
const app = express();
const UserRouter = require('./Routes/user.route.js');
const ProductRouter = require('./Routes/product.route.js');
const OfferRouter = require('./Routes/offer.route.js');
app.use(express.json());
app.use(cors());
app.use('/', OfferRouter)
app.use('/', ProductRouter);
app.use('/', UserRouter);
Connection();
app.listen(process.env.PORT, () =>
  console.log(`Server is running successfully on PORT ${process.env.PORT}`)
);


