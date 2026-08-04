import mongoose from "mongoose";

const registryReportSchema = new mongoose.Schema(
  {
    snapshot1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegistrySnapshot",
    },

    snapshot2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegistrySnapshot",
    },

    added: {
      type: [String],
      default: [],
    },

    deleted: {
      type: [String],
      default: [],
    },

    modified: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "RegistryReport",
  registryReportSchema
);