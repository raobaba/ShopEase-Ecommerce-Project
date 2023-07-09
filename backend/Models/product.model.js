const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    id:String,
    url: String,
    detailUrl: String,
    title:Object,
    price: Object,
    quantity:Number,
    brand: String,
    networkType: String,
    simType: String,
    description: String,
    ratings: String,
    discount: String,
    RAM: String,
    type: String,
    offers: String,
    feature: String,
    tagline: String,
});

const ProductModel = mongoose.model('Product', productSchema);
module.exports = { ProductModel }