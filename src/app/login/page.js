"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import WalletConnect from "@/components/WalletConnect";
import { setUser, setWalletAddress } from "@/store/slices/authSlice";
import { setProfile } from "@/store/slices/userSlice";

export default function Login() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        userType: "",
        bio: "",
    });
    const router = useRouter();
    const dispatch = useDispatch();
    const { walletAddress, isAuthenticated, userType } = useSelector(
        (state) => state.auth
    );

    // Reset steps when component mounts
    useEffect(() => {
        setStep(1);
    }, []);

    // Handle already authenticated users
    useEffect(() => {
        const checkExistingUser = async () => {
            if (walletAddress) {
                try {
                    const response = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ walletAddress }),
                    });
                    const data = await response.json();

                    if (data.user) {
                        dispatch(setUser(data.user));
                        dispatch(setProfile(data.user));
                        router.push(
                            data.user.userType === "artisan"
                                ? "/dashboard"
                                : "/marketplace"
                        );
                    } else {
                        setStep(2); // Show registration if no user found
                    }
                } catch (error) {
                    console.error("Error checking user:", error);
                }
            }
        };

        if (isAuthenticated) {
            router.push(userType === "artisan" ? "/dashboard" : "/marketplace");
        } else if (walletAddress) {
            checkExistingUser();
        }
    }, [walletAddress, isAuthenticated, userType, router, dispatch]);

    const handleWalletConnect = (address) => {
        dispatch(setWalletAddress(address));
        // User existence check happens in useEffect
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (!walletAddress || !formData.userType || !formData.name) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    walletAddress,
                }),
            });

            const data = await response.json();

            if (data.user) {
                dispatch(setUser(data.user));
                dispatch(setProfile(data.user));
                router.push(
                    data.user.userType === "artisan"
                        ? "/dashboard"
                        : "/marketplace"
                );
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-2xl font-bold text-center">
                    Welcome to Craftsman Marketplace
                </h2>

                {step === 1 ? (
                    <div className="space-y-4">
                        <h3 className="text-lg text-center">
                            Step 1: Connect Your Wallet
                        </h3>
                        <WalletConnect onSuccess={handleWalletConnect} />
                    </div>
                ) : (
                    <form onSubmit={handleRegistration} className="space-y-6">
                        <h3 className="text-lg">
                            Step 2: Complete Your Profile
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                I am a...
                            </label>
                            <select
                                value={formData.userType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        userType: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="buyer">Buyer</option>
                                <option value="artisan">Artisan</option>
                            </select>
                        </div>

                        {formData.userType === "artisan" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    rows={4}
                                    placeholder="Tell us about your craft..."
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Complete Registration
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
