import { useState, useEffect } from "react";
import {
    useGetAvailableProductsQuery,
    usePlaceBidMutation
} from "../../services/UserService.jsx";
import styles from "./DashBoard.module.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const DashBoard = () => {
    const { data: availableProducts, isLoading, isError, refetch } = useGetAvailableProductsQuery();
    const [placeBidApi] = usePlaceBidMutation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [bid, setBid] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [now, setNow] = useState(new Date()); // 🔥 track current time
    const navigate = useNavigate();

    // 🔥 keep "now" updated every second
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

    const placeBid = async (productId) => {
        const user = getUserToken();
        const userId = user?.sub;

        if (!userId) {
            setError("User not logged in!");
            return;
        }

        if (!bid || isNaN(bid) || Number(bid) <= 0) {
            setError("Please enter a valid bid amount!");
            return;
        }

        const data = {
            userId,
            productId,
            price: bid
        };

        try {
            setIsSubmitting(true);
            const response = await placeBidApi(data).unwrap();
            if (response.status === 200) {
                setSuccessMessage(`Bid of ₦${bid} placed successfully!`);
                setBid("");
                refetch();
            }
        } catch (err) {
            setError(err.message || "Failed to place bid");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 🔥 countdown helper
    const formatCountdown = (ms) => {
        if (ms <= 0) return "00:00:00";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
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
                            {/* Image */}
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

                            {/* Content */}
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
                                    <p className={styles.price}>₦{product.price}</p>
                                </div>

                                {/* countdown display */}
                                <div className={styles.countdown}>{countdown}</div>

                                {/* Bid input */}
                                <input
                                    type="number"
                                    min="1"
                                    value={bid}
                                    onChange={(e) => setBid(e.target.value)}
                                    placeholder="Enter your amount"
                                    className={styles.input}
                                    disabled={status !== "open"} // disable if not active
                                />

                                {/* Place Bid button */}
                                <div className={styles.bid}>
                                    <button
                                        onClick={() => placeBid(product.id)}
                                        disabled={isSubmitting || status !== "open"}
                                    >
                                        {isSubmitting ? "Placing Bid..." : "Place Bid"}
                                    </button>
                                </div>

                                <div className={styles.error}>{error}</div>
                                <div className={styles.successMessage}>{successMessage}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal for larger image */}
            {selectedImage && (
                <div className={styles.modal} onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Product preview" className={styles.modalImage} />
                </div>
            )}
        </>
    );
};

export default DashBoard;
