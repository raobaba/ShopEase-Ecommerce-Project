const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String 
});
const offerModel = mongoose.model('Offer',offerSchema);
module.exports={offerModel}

