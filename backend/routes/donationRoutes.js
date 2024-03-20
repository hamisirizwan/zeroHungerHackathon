const express = require('express');
const authenticate = require('../middleware/auth');
const { postDonation, getAllDonations, getUserPostedDonations, receiveDonation, getReceivedDonations } = require('../controllers/donationController');
const router = express.Router();

router.use(authenticate);
router.post('/post', postDonation);
router.get('/get-all', getAllDonations);
router.get('/user-posted', getUserPostedDonations);
router.put('/receive/:donation_id', receiveDonation);
router.get('/user-received', getReceivedDonations);

module.exports = router;
