import { useState } from "react";
import { useCloudinaryCallMutation } from "../../services/CloudinaryService.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useAuctionProductMutation } from "../../services/UserService.jsx";

const AuctionPage = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [imageCloud] = useCloudinaryCallMutation();
    const [auctionProduct] = useAuctionProductMutation();
    const navigate = useNavigate();

    const getUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return null;
        }
        try {
            const decoded = jwtDecode(token);
            console.log("Decoded:", decoded);
            return decoded;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const handleImageUpload = async () => {
        if (!image) {
            alert("Please select an image first!");
            return null;
        }

        const data = new FormData();
        data.append("file", `${image}`);
        data.append("upload_preset", "auctionApp");
        data.append("cloud_name", "emmastonecode");
        try {
            const response = await imageCloud(data).unwrap();
            console.log("Upload response:", response);
            return response.secure_url;
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Image upload failed.");
            return null;
        }
    };

    const submitForm = async () => {
        if (!productName.trim()) {
            alert("Product name is required");
            return;
        }
        if (!price || price <= 0) {
            alert("Price must be a positive number");
            return;
        }
        if (!startDate || !endDate) {
            alert("Please select both start and end date");
            return;
        }
        if (new Date(startDate) >= new Date(endDate)) {
            alert("Start date must be before end date");
            return;
        }

        const imageUrl = await handleImageUpload();
        if (!imageUrl) return;

        const user = getUserFromToken();
        if (!user) return;

        const data = {
            productName,
            price,
            imageUrl,
            bidStart: startDate,
            bidStop: endDate,
            sellerId: user.sub || user.id,
        };

        try {
            const response = await auctionProduct(data).unwrap();
            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <form
                style={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                <label>Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    style={styles.input}
                />

                <label>Price</label>
                <div style={styles.priceContainer}>
                    <span style={{ fontSize: "18px" }}>₦</span>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <label>Auction Start Date & Time</label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={styles.input}
                />

                <label>Auction End Date & Time</label>
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={styles.input}
                />

                <label>Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Upload
                </button>
            </form>
        </div>
    );
};

export default AuctionPage;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
    },
    form: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
        fontSize: "16px",
    },
    priceContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    button: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};
