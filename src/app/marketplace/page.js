"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function Marketplace() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products");
            const data = await response.json();
            if (data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(
        (product) =>
            (category === "all" || product.category === category) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Search and filter UI */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full md:w-auto px-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 border rounded-lg"
                >
                    <option value="all">All Categories</option>
                    <option value="pottery">Pottery</option>
                    <option value="textiles">Textiles</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="woodwork">Woodwork</option>
                </select>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4">
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        )}
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p className="text-gray-600 mt-2">
                            {product.description}
                        </p>
                        <p className="text-lg font-bold mt-2">
                            {product.price} ETH
                        </p>

                        <div className="mt-4">
                            <QRCode
                                value={`${window.location.origin}/profile/${product.artisanAddress}`}
                                size={100}
                            />
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <Link
                                href={`/profile/${product.artisanAddress}`}
                                className="text-blue-500 hover:underline"
                            >
                                View Artisan
                            </Link>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Purchase
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
