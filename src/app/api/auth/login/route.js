import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    try {
        await dbConnect();

        const { walletAddress } = await request.json();

        const user = await User.findOne({ walletAddress });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
