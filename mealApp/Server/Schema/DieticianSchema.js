import mongoose from "mongoose";

const DieticianRecommendationSchema = new mongoose.Schema({
    dieticianId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to Dietician user
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    recommendation: { type: String, required: true }, // Recommendation text
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

const DieticianSchema = mongoose.model("DieticianSchema", DieticianRecommendationSchema);

export default DieticianSchema;
