import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        enum: ["buyer", "artisan"],
        required: true,
    },
    bio: String,
    profileImage: String,
    products: [
        {
            type: String, // Product IDs
        },
    ],
    purchasedProducts: [
        {
            type: String, // Product IDs
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
