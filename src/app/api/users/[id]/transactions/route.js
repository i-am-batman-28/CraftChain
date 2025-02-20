import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const user = await User.findOne({ walletAddress: params.id });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // For prototype, return mock transactions
        // In production, you would fetch from blockchain/database
        const mockTransactions = [
            {
                id: "1",
                productName: "Handcrafted Vase",
                date: new Date(),
                price: "0.5",
                counterpartyAddress: "0x1234...5678",
            },
            // Add more mock transactions as needed
        ];

        return NextResponse.json({ transactions: mockTransactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { error: "Failed to fetch transactions" },
            { status: 500 }
        );
    }
}
