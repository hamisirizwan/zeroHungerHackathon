const Donation = require("../models/donationModel");

//post donation
const postDonation = async (req, res) => {
  const { item, quantity, description } = req.body;
  try {
    if (!item || !quantity) {
      return res.status(400).json({
        success: false,
        message: "item or quantiy is missing",
      });
    }

    //save the new donation
    const donation = new Donation({
      item,
      quantity,
      description,
      donor: req.user._id,
    });

    const newDonation = await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation created successfully",
      data: newDonation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const receiveDonation = async (req, res) => {
  const { donation_id } = req.params;
  try {
    const user = req.user;

    if (user.user_type !== "recipient") {
      return res.status(400).json({
        success: false,
        message: "donors cannot receive donations",
      });
    }

    const existingDonation = await Donation.findOne({ _id: donation_id });

    if (!existingDonation) {
      return res.status(400).json({
        success: false,
        message: `Donation with id ${donation_id} not found`,
      });
    }

    existingDonation.recipient = req.user._id;
    existingDonation.status = "taken";
    existingDonation.dateTaken = new Date();

    const updatedDonation = await existingDonation.save();

    res.status(201).json({
      success: true,
      message: "Donation created successfully",
      data: updatedDonation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({status:"pending"}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "donations retrieved successfully",
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserPostedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user._id,
    })
      .populate({
        path: "recipient",
        select: ["_id", "name", "email", "location"],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "donations retrieved successfully",
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReceivedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      recipient: req.user._id,
    })
      .populate({
        path: "donor",
        select: ["_id", "name", "email", "location"],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "donations retrieved successfully",
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  postDonation,
  receiveDonation,
  getAllDonations,
  getUserPostedDonations,
  getReceivedDonations,
};
