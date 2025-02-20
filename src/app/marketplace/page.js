"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";

export default function Marketplace() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        const staticProducts = [
            {
                id: 1,
                name: "Traditional Clay Pottery",
                category: "pottery",
                price: "0.5",
                imageUrl: "/pottery.jpg",
                artisanName: "Ramesh Kumar",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                location: "Jaipur, Rajasthan",
                description: "Hand-crafted clay pottery using traditional techniques passed down through generations"
            },
            {
                id: 2,
                name: "Handwoven Pashmina Shawl",
                category: "textiles",
                price: "0.8",
                imageUrl: "/p.jpg",
                artisanName: "Fatima Begum",
                artisanAddress: "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99",
                location: "Srinagar, Kashmir",
                description: "Authentic Kashmiri Pashmina shawl with intricate handwoven patterns"
            },
            {
                id: 3,
                name: "Brass Temple Bell",
                category: "metalwork",
                price: "0.4",
                imageUrl: "/b.jpg",
                artisanName: "Vishnu Prajapati",
                artisanAddress: "0x3B9D6A6C8D2E1F4A5B7C9E8D0F2A4B6C8E0D2F1",
                location: "Moradabad, UP",
                description: "Traditional brass bell crafted using ancient metalworking techniques"
            },
            {
                id: 4,
                name: "Madhubani Painting",
                category: "art",
                price: "1.2",
                imageUrl: "/m.jpg",
                artisanName: "Lakshmi Devi",
                artisanAddress: "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0",
                location: "Madhubani, Bihar",
                description: "Traditional Madhubani artwork depicting cultural stories and motifs"
            },
            {
                id: 5,
                name: "Wooden Handicraft",
                category: "woodwork",
                price: "0.6",
                imageUrl: "/shopping-2.jpg",
                artisanName: "Suresh Sharma",
                artisanAddress: "0x4F3E2D1C0B9A8F7E6D5C4B3A2E1D0C9B8A7F6E5",
                location: "Saharanpur, UP",
                description: "Intricately carved wooden decorative items made from sustainable wood"
            },
            {
                id: 6,
                name: "Zari Embroidered Saree",
                category: "textiles",
                price: "1.5",
                imageUrl: "/shopping.jpg",
                artisanName: "Priya Patel",
                artisanAddress: "0x5E4D3C2B1A0F9E8D7C6B5A4E3D2C1B0A9F8E7D6",
                location: "Varanasi, UP",
                description: "Hand-embroidered silk saree with traditional zari work"
            }
        ];
        setProducts(staticProducts);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handlePurchase = (productId) => {
        router.push(`/purchase/${productId}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <div className="mt-3">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Artisan:</span> {product.artisanName}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Location:</span> {product.location}
                            </p>
                            <p className="text-lg font-bold mt-2">{product.price} ETH</p>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <QRCode
                                value={`${product.artisanAddress}`}
                                size={100}
                                className="rounded-lg"
                            />
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <Link
                                href={`/artisan/${product.artisanAddress}`}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View Artisan
                            </Link>
                            <button 
                                onClick={() => handlePurchase(product.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
