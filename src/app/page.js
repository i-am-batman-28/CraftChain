"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import QRCode from "react-qr-code";
import Navbar from "@/components/Navbar";

export default function Home() {
    const { isAuthenticated, userType } = useSelector((state) => state.auth);
    const products = useSelector((state) => state.products?.items || []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-8">
                        Welcome to the Future of Artisan Commerce
                    </h1>
                    <p className="text-xl text-gray-600 mb-12">
                        Authentic handcrafted products with blockchain
                        verification
                    </p>
                </div>

                <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                            {/* ... rest of your product card code ... */}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
