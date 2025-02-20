"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import QRCode from "react-qr-code";

export default function PurchasePage() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { walletAddress, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const products = {
            "1": {
                id: 1,
                name: "Traditional Clay Pottery",
                price: "0.5",
                imageUrl: "/pottery.jpg",
                artisanName: "Ramesh Kumar",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                description: "Hand-crafted clay pottery using traditional techniques passed down through generations"
            },
            "2": {
                id: 2,
                name: "Handwoven Pashmina Shawl",
                price: "0.8",
                imageUrl: "/p.jpg",
                artisanName: "Fatima Begum",
                artisanAddress: "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99",
                description: "Authentic Kashmiri Pashmina shawl with intricate handwoven patterns"
            },
            "3": {
                id: 3,
                name: "Brass Temple Bell",
                price: "0.4",
                imageUrl: "/b.jpg",
                artisanName: "Vishnu Prajapati",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44f", // Updated address
                description: "Traditional brass bell crafted using ancient metalworking techniques"
            },
            "4": {
                id: 4,
                name: "Madhubani Painting",
                price: "1.2",
                imageUrl: "/m.jpg",
                artisanName: "Lakshmi Devi",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44d", // Updated address
                description: "Traditional Madhubani artwork depicting cultural stories and motifs"
            },
            "5": {
                id: 5,
                name: "Wooden Handicraft",
                price: "0.6",
                imageUrl: "/shopping-2.jpg",
                artisanName: "Suresh Sharma",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Fixed address
                description: "Intricately carved wooden decorative items made from sustainable wood"
            },
            "6": {
                id: 6,
                name: "Zari Embroidered Saree",
                price: "1.5",
                imageUrl: "/shopping.jpg",
                artisanName: "Priya Patel",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Fixed address
                description: "Hand-embroidered silk saree with traditional zari work"
            }
        };

        setProduct(products[params.id]);
        setLoading(false);
    }, [params.id]);

    const handlePayment = async () => {
        try {
            const response = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: walletAddress,
                    to: product.artisanAddress,
                    value: '0x' + (parseFloat(product.price) * 1e18).toString(16),
                }],
            });
            alert('Payment successful! Transaction: ' + response);
        } catch (error) {
            alert('Payment failed: ' + error.message);
        }
    };

    if (loading || !product) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6">Purchase Product</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full rounded-lg"
                            />
                            <p className="mt-4 text-gray-600">{product.description}</p>
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">{product.name}</h2>
                            <p className="text-xl font-semibold">{product.price} ETH</p>
                            
                            <div className="border-t pt-4 mt-4">
                                <p className="text-gray-600">
                                    <span className="font-medium">Artisan: </span>
                                    {product.artisanName}
                                </p>
                            </div>
                            
                            <div className="flex flex-col items-center space-y-4 mt-6">
                                <QRCode
                                    value={product.artisanAddress}
                                    size={150}
                                    className="mb-2"
                                />
                                <p className="text-sm text-gray-500 text-center">
                                    Scan to pay directly
                                </p>
                            </div>
                            
                            <button
                                onClick={handlePayment}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                            >
                                Pay {product.price} ETH
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}