document.addEventListener("DOMContentLoaded", async function () {
    const search = document.getElementById("search-form");
    const searchError = document.getElementById("search-error-message");
    const bidContainer = document.getElementById("bid-container");
    const userInfo = document.getElementById("user");
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    const userName = user.userName;
    console.log(userName);
    userInfo.innerHTML = "";
    userInfo.innerHTML = `Welcome, ${userName}`;

    search.addEventListener("submit", event => {
        event.preventDefault();
        searchError.textContent = "";
        if (search.value === "") {
            searchError.textContent = "Cannot be empty. Please enter what you want to search for.";
        }
    });

    try {
        const response = await fetch("http://localhost:8080/api/viewAllProducts", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Backend error:", result.message);
        } else {
            localStorage.setItem("listOfBids", JSON.stringify(result));
            bidContainer.innerHTML = "";

            const now = new Date().getTime();

            result.forEach(bid => {
                console.log(bid)
                const bidBox = document.createElement("div");
                bidBox.classList.add("bid-box");

                const date = new Date(bid.bidStartTime);
                const dateTwo = new Date(bid.bidStopTime);

                const formatted = date.toLocaleString("en-NG", {
                    year: "numeric", month: "long", day: "numeric",
                    hour: "numeric", minute: "2-digit", hour12: true
                });

                const formattedDateTwo = dateTwo.toLocaleString("en-NG", {
                    year: "numeric", month: "long", day: "numeric",
                    hour: "numeric", minute: "2-digit", hour12: true
                });

                bidBox.innerHTML = `
                    <div class="bid-error"></div>
                    <input type="hidden" class="product-id" value="${bid.id}">
                    <p><strong>Name:</strong> ${bid.name}</p>
                    <p><strong>Price:</strong> ₦${bid.price}</p>
                    <p><strong>Start:</strong> ${formatted}</p>
                    <p><strong>Stop:</strong> ${formattedDateTwo}</p>
                    <input type="text" class="price-input" placeholder="Enter your bidding amount" required>
                    <button  class="bid-button" ${now < date || now > dateTwo ? 'disabled' : ''}>Bid</button>
                `;
                bidContainer.appendChild(bidBox);
            });

            setupBidEvents();
        }
    } catch (err) {
        console.log("Network error:", err);
    }
});


async function setupBidEvents() {
    const bidBoxes = document.querySelectorAll(".bid-box");

    bidBoxes.forEach(bidBox => {
        const bidButton = bidBox.querySelector(".bid-button");
        const priceInput = bidBox.querySelector(".price-input");
        const productIdInput = bidBox.querySelector(".product-id");
        const message = bidBox.querySelector(".bid-error");

        bidButton.addEventListener("click", async (event) => {
            event.preventDefault();

            message.textContent = "";

            const price = priceInput.value.trim();
            const productId = productIdInput.value;

            if (price === "") {
                message.textContent = "Please enter a price.";
                return;
            }

            const digitRegex = /^\d+$/;
            if (!digitRegex.test(price)) {
                message.textContent = "Please enter only digits.";
                return;
            }


            const user = JSON.parse(localStorage.getItem("userData"));

            const userId = user.id;

            const data = {
                userId: userId,
                price: price,
                productId: productId
            };

            try {
                const response = await fetch("http://localhost:8080/api/bid", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if(!response.ok){
                    message.textContent = result.message;
                    return;
                }else{
                    message.textContent = "Bid successfully.";
                    message.style.color = "green";
                }
            } catch (error) {
                console.error("Error submitting bid:", error);
                message.textContent = "Error submitting bid.";
            }
        });
    });
}
