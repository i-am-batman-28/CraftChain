import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(request) {
    try {
        await dbConnect();
        const { walletAddress, name, bio, userType } = await request.json();

        const user = await User.findOneAndUpdate(
            { walletAddress },
            { name, bio, userType },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}
    