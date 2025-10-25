import Investments from "../model/investments.model.js";

// Get all investments for logged-in user
export const getInvestments = async (req, res) => {
  try {
    console.log("req.user in getInvestments:", req.user); // debug
    console.log("User ID:", req.user.id); // debug
    
    const investments = await Investments.find({ userId: req.user.id });
    console.log("Found investments:", investments); // debug
    
    res.json(investments);
  } catch (error) {
    console.error("Error in getInvestments:", error); // debug
    res.status(500).json({ error: error.message });
  }
};

// Get a single investment for logged-in user
export const getInvestment = async (req, res) => {
  try {
    const investment = await Investments.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!investment) return res.status(404).json({ error: "Investment not found" });
    res.json(investment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create investment for logged-in user
export const createInvestment = async (req, res) => {
  try {
    const investment = new Investments({
      ...req.body,
      userId: req.user.id, // assign logged-in user
    });
    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update investment for logged-in user
export const updateInvestment = async (req, res) => {
  try {
    const investment = await Investments.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!investment) return res.status(404).json({ error: "Investment not found" });
    res.json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete investment for logged-in user
export const deleteInvestment = async (req, res) => {
  try {
    const investment = await Investments.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!investment) return res.status(404).json({ error: "Investment not found" });
    res.json({ message: "Investment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
