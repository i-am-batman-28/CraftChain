"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import QRCode from "react-qr-code";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
    const { isAuthenticated, userType } = useSelector((state) => state.auth);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products?limit=4");
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">
                                        Discover Authentic
                                    </span>
                                    <span className="block text-blue-600">
                                        Indian Craftsmanship
                                    </span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Connect directly with skilled artisans
                                    across India. Each piece comes with
                                    blockchain verification, ensuring
                                    authenticity and fair trade.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            href="/marketplace"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                        >
                                            Explore Marketplace
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="/craft-hero.jpg"
                        alt="Indian Crafts"
                    />
                </div>
            </div>

            {/* Featured Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Featured Creations
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Discover unique pieces from India's finest artisans
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between space-x-8">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        <Link href={`/product/${product.id}`}>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.category}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {product.price} ETH
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        View All Products
                    </Link>
                </div>
            </div>

            {/* Statistics */}
            <div className="bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                1000+
                            </p>
                            <p className="mt-2 text-lg font-medium text-blue-100">
                                Artisans
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                28
                            </p>
                            <p className="mt-2 text-lg font-medium text-blue-100">
                                States
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                5000+
                            </p>
                            <p className="mt-2 text-lg font-medium text-blue-100">
                                Products
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                10K+
                            </p>
                            <p className="mt-2 text-lg font-medium text-blue-100">
                                Customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* India Map Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Our Artisan Network
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Connecting craftspeople across India
                    </p>
                </div>
                <div className="relative h-[600px] w-full">
                    <img
                        src="/india-map.svg"
                        alt="India Map"
                        className="w-full h-full object-contain"
                    />
                    {/* Add dots for major artisan locations */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                    {/* Add more location dots as needed */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
