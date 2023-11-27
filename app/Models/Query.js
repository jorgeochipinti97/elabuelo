import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema(
  {
    name: { type: String },
    zipCode: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const Query = mongoose.models.Query || mongoose.model("Query", QuerySchema);

export default Query;
