import mongoose from "mongoose";

const registrySnapshotSchema = new mongoose.Schema(
  {
    snapshotName: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    registryData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "RegistrySnapshot",
  registrySnapshotSchema
);