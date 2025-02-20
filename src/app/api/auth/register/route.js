import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    try {
        await dbConnect();

        const { walletAddress, userType, name, bio } = await request.json();

        let user = await User.findOne({ walletAddress });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        user = await User.create({
            walletAddress,
            userType,
            name,
            bio,
            products: [],
            purchasedProducts: [],
        });

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
