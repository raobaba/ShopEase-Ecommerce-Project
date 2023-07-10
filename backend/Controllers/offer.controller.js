const Offer = require("../Models/offer.model.js");

// Controller function to retrieve all offers
const getAllOffers = (req, res) => {
  Offer.find()
    .then((offers) => {
      res.json(offers);
    })
    .catch((error) => {
      console.error('Error retrieving offers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Controller function to retrieve a specific offer by ID
const getOfferById = (req, res) => {
  const offerId = req.params.id;

  Offer.findById(offerId)
    .then((offer) => {
      if (offer) {
        res.json(offer);
      } else {
        res.status(404).json({ error: 'Offer not found' });
      }
    })
    .catch((error) => {
      console.error('Error retrieving offer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Controller function to create a new offer
const createOffer = (req, res) => {
  const newOffer = req.body;

  Offer.create(newOffer)
    .then((offer) => {
      res.json(offer);
    })
    .catch((error) => {
      console.error('Error creating offer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Controller function to update a specific offer by ID
const updateOffer = (req, res) => {
  const offerId = req.params.id;
  const updatedOffer = req.body;

  Offer.findByIdAndUpdate(offerId, updatedOffer, { new: true })
    .then((offer) => {
      if (offer) {
        res.json(offer);
      } else {
        res.status(404).json({ error: 'Offer not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating offer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Controller function to delete a specific offer by ID
const deleteOffer = (req, res) => {
  const offerId = req.params.id;

  Offer.findByIdAndDelete(offerId)
    .then((offer) => {
      if (offer) {
        res.json({ message: 'Offer deleted successfully' });
      } else {
        res.status(404).json({ error: 'Offer not found' });
      }
    })
    .catch((error) => {
      console.error('Error deleting offer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer
};
