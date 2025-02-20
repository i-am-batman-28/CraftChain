"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import QRCode with no SSR to avoid window is not defined error
const QRCode = dynamic(() => import("react-qr-code"), {
    ssr: false,
});

export default function UserProfile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    const { user, walletAddress, userType } = useSelector(
        (state) => state.auth
    );
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        userType: "",
    });
    const [transactions, setTransactions] = useState([]);

    // Set mounted state and initialize form data
    useEffect(() => {
        setMounted(true);
        if (user) {
            setFormData({
                name: user.name || "",
                bio: user.bio || "",
                userType: user.userType || "",
            });
        }
    }, [user]);

    // Don't render anything until mounted
    if (!mounted) return null;

    useEffect(() => {
        if (!walletAddress) {
            router.push("/login");
        }
        fetchTransactions();
    }, [walletAddress, router]);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(
                `/api/users/${walletAddress}/transactions`
            );
            const data = await response.json();
            if (data.transactions) {
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress,
                    ...formData,
                }),
            });

            const data = await response.json();
            if (data.user) {
                dispatch(setProfile(data.user));
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleDisconnectWallet = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Section */}
                <div className="col-span-1">
                    <div className="border rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">My Profile</h1>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-blue-500 hover:underline"
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        </div>

                        {isEditing ? (
                            <form
                                onSubmit={handleUpdateProfile}
                                className="space-y-4"
                            >
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
                                        Role
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
                                        <option value="buyer">Buyer</option>
                                        <option value="artisan">Artisan</option>
                                    </select>
                                </div>

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
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-sm text-gray-500">
                                        Name
                                    </h2>
                                    <p className="font-medium">{user?.name}</p>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">
                                        Role
                                    </h2>
                                    <p className="font-medium">
                                        {user?.userType}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">
                                        Bio
                                    </h2>
                                    <p className="font-medium">{user?.bio}</p>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">
                                        Wallet Address
                                    </h2>
                                    <p className="font-mono text-sm">
                                        {walletAddress}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <QRCode
                                        value={`${window.location.origin}/profile/${walletAddress}`}
                                        size={150}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleDisconnectWallet}
                            className="mt-6 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                </div>

                {/* Transaction History Section */}
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold mb-6">
                        {userType === "artisan"
                            ? "Sales History"
                            : "Purchase History"}
                    </h2>
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">
                                            {tx.productName}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {new Date(
                                                tx.date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">
                                            {tx.price} ETH
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {userType === "artisan"
                                                ? "Sold to"
                                                : "Bought from"}
                                            :{" "}
                                            <a
                                                href={`/profile/${tx.counterpartyAddress}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {tx.counterpartyAddress.slice(
                                                    0,
                                                    6
                                                )}
                                                ...
                                                {tx.counterpartyAddress.slice(
                                                    -4
                                                )}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
