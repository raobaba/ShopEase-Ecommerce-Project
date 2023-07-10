const {offerController} = require('../Controllers/offer.controller.js'); 
const express = require('express');
const offerRouter = express.Router();

offerRouter.get('/offers', offerController.getAllOffers);
offerRouter.get('/offers/:id', offerController.getOfferById);
offerRouter.post('/offers', offerController.createOffer);
offerRouter.put('/offers/:id', offerController.updateOffer);
offerRouter.delete('/offers/:id', offerController.deleteOffer);

module.exports = offerRouter;
