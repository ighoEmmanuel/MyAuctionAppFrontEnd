import React, { useState, useEffect } from "react";
import {
    useGetAvailableProductsQuery,
    usePlaceBidMutation
} from "../../services/UserService.jsx";
import styles from "./DashBoard.module.css";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router";

const DashBoard = () => {
    const { data: availableProducts, isLoading, isError, refetch } = useGetAvailableProductsQuery(undefined, {
        pollingInterval: 1000,
    });
    const [placeBidApi] = usePlaceBidMutation();

    const [bids, setBids] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessages, setSuccessMessages] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [now, setNow] = useState(new Date());

    const navigate = useNavigate();


    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading products.</p>;

    const getUserToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return null;
        }
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const handleBidChange = (productId, value) => {
        setErrors(prev => ({ ...prev, [productId]: "" }));
        setSuccessMessages(prev => ({ ...prev, [productId]: "" }));
        setBids(prev => ({ ...prev, [productId]: value }));
    };

    const placeBid = async (productId) => {
        const user = getUserToken();
        const userId = user?.sub;
        const bid = bids[productId];

        if (!userId) {
            setErrors(prev => ({ ...prev, [productId]: "User not logged in!" }));
            return;
        }

        if (!bid || isNaN(bid) || Number(bid) <= 0) {
            setErrors(prev => ({ ...prev, [productId]: "Please enter a valid bid amount!" }));
            return;
        }

        const data = { userId, productId, price: bid };

        try {
            setIsSubmitting(true);
            const response = await placeBidApi(data).unwrap();

            if (response.bid !== "undefined") {
                setSuccessMessages(prev => ({
                    ...prev,
                    [productId]: `Bid of ₦${bid} placed successfully!`
                }));
                setBids(prev => ({ ...prev, [productId]: "" }));
                await refetch();
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, [productId]: error.data.message }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCountdown = (ms) => {
        if (ms <= 0) return "00d 00:00:00";

        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");

        return `${days}d ${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            <div className={styles.topBar}>
                To Auction Your Product click this <Link to="/auction">Auction Product</Link>
            </div>
            <div className={styles.grid}>
                {availableProducts?.map(product => {
                    const start = new Date(product.bidStartTime);
                    const end = new Date(product.bidStopTime);

                    let status = "";
                    let countdown = "";

                    if (now < start) {
                        status = "notStarted";
                        countdown = `Starts in: ${formatCountdown(start - now)}`;
                    } else if (now >= start && now <= end) {
                        status = "open";
                        countdown = `Ends in: ${formatCountdown(end - now)}`;
                    } else {
                        status = "ended";
                        countdown = "Bidding ended";
                    }

                    return (
                        <div key={product.id} className={styles.card}>
                            <div
                                className={styles.imageWrapper}
                                onClick={() => setSelectedImage(product.imageUrl)}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.field}>
                                    <span className={styles.label}>Product Name:</span>
                                    <p className={styles.value}>{product.name}</p>
                                </div>

                                <div className={styles.field}>
                                    <span className={styles.label}>Description:</span>
                                    <p className={styles.value}>{product.description}</p>
                                </div>

                                <div className={styles.field}>
                                    <span className={styles.label}>Price:</span>
                                    <p className={styles.price}>₦{product.price.toLocaleString()}</p>
                                </div>

                                <div className={styles.countdown}>{countdown}</div>

                                <input
                                    type="number"
                                    min="1"
                                    value={bids[product.id] || ""}
                                    onChange={(e) => handleBidChange(product.id, e.target.value)}
                                    placeholder="Enter your amount"
                                    className={styles.input}
                                    disabled={status !== "open"}
                                />

                                <div className={styles.bid}>
                                    <button
                                        onClick={() => placeBid(product.id)}
                                        disabled={isSubmitting || status !== "open"}
                                    >
                                        {isSubmitting ? "Placing Bid..." : "Place Bid"}
                                    </button>
                                </div>

                                <div className={styles.error}>{errors[product.id]}</div>
                                <div className={styles.successMessage}>{successMessages[product.id]}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedImage && (
                <div className={styles.modal} onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Product preview" className={styles.modalImage} />
                </div>
            )}
        </>
    );
};

export default DashBoard;
