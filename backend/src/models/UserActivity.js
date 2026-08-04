import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    activity: {
      type: String,
      required: true,
    },

    ip: {
      type: String,
      default: "",
    },

    riskScore: {
      type: Number,
      default: 0,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserActivity", userActivitySchema);