"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { isAuthenticated, userType, walletAddress } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        Craftsman Marketplace
                    </Link>
                    <div className="flex items-center gap-4">
                        {!isAuthenticated ? (
                            <Link
                                href="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Connect Wallet
                            </Link>
                        ) : (
                            <>
                                {walletAddress && (
                                    <span className="text-sm text-gray-600">
                                        {walletAddress.slice(0, 6)}...
                                        {walletAddress.slice(-4)}
                                    </span>
                                )}
                                <Link
                                    href="/profile"
                                    className="text-blue-500 hover:underline"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={
                                        userType === "artisan"
                                            ? "/dashboard"
                                            : "/marketplace"
                                    }
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {userType === "artisan"
                                        ? "Dashboard"
                                        : "Marketplace"}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:underline"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
