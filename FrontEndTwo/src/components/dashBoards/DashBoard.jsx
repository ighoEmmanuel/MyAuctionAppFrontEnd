import {useGetAvailableProductsQuery} from "../../services/UserService.jsx";
import styles from "./DashBoard.module.css"

const DashBoard = () => {
    const { data: availableProducts, isLoading, isError } = useGetAvailableProductsQuery();
    console.log(availableProducts);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading products.</p>;

    return (
        <div className={styles.card}>
            {
                availableProducts?.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>₦{product.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default DashBoard;
