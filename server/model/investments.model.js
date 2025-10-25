import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['stock', 'bond', 'mutual-fund', 'crypto', 'real-estate', 'other']
    },
    assetName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    returns: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Investments = mongoose.model("Investment", investmentSchema);
export default Investments;