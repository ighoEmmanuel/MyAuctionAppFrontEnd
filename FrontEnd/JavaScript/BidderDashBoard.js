document.addEventListener("DOMContentLoaded", async function () {
    const search = document.getElementById("search-form");
    const searchError = document.getElementById("search-error-message");
    const bidContainer = document.getElementById("bid-container");
    const userInfo = document.getElementById("user");
    const user = JSON.parse(localStorage.getItem("userData"));
    const editProfile  = document.getElementById("edit-button");
    const editForm = document.getElementById("edit-form");
    editForm.innerHTML = "";
    const error = document.getElementById("error");

    console.log(user);
    const userName = user.userName;
    userInfo.innerHTML = "";
    userInfo.innerHTML = `Welcome, ${userName}`;
    const closeSidebar = document.getElementById("closeSidebar");
    const profile = document.getElementById("profile");
    const profileBar = document.getElementById("profileBar");
    const userProfile  = document.getElementById("user-profile");
    const presentProfile = user.profile
    const address = presentProfile.address;
    let profileText = presentProfile ? `<p>${address.city},${address.street},${address.houseNumber}</p>` : `<p>No Address set</p>`;

    userProfile.innerHTML = `
  <div class='user-pro'>
    <label class="user-name">UserName</label>
    <p>${userName}</p>
    <label>Email</label>
    <p>${user.email}</p>
    <label>Address</label>
    ${profileText}
  </div>`;




    profile.addEventListener('click', () => {
        profileBar.classList.toggle('show');
    });

    closeSidebar.addEventListener('click', (e) => {
        e.preventDefault();

        profileBar.classList.remove('show');
    })

    editProfile.addEventListener('click', (e) => {
        // e.preventDefault();

        editForm.innerHTML = `
            <form id="profile-edits">
                <div id="error"></div>
                <label for="Address">City</label>
                 <select id="nigerian-cities" required>
                    <option value="">-- Select a City --</option>
                    
                    <optgroup label="Abia">
                        <option value="aba">Aba</option>
                        <option value="umuahia">Umuahia</option>
                        <option value="ohafia">Ohafia</option>
                    </optgroup>
                    
                    <optgroup label="Adamawa">
                        <option value="yola">Yola</option>
                        <option value="mubi">Mubi</option>
                        <option value="jimeta">Jimeta</option>
                    </optgroup>
            
                    <optgroup label="Akwa Ibom">
                        <option value="uyo">Uyo</option>
                        <option value="ikot ekpene">Ikot Ekpene</option>
                        <option value="oron">Oron</option>
                    </optgroup>
            
                    <optgroup label="Anambra">
                        <option value="awka">Awka</option>
                        <option value="onitsha">Onitsha</option>
                        <option value="nnewi">Nnewi</option>
                    </optgroup>
            
                    <optgroup label="Bauchi">
                        <option value="bauchi">Bauchi</option>
                        <option value="azare">Azare</option>
                        <option value="jamaare">Jama'are</option>
                    </optgroup>
            
                    <optgroup label="Bayelsa">
                        <option value="yenagoa">Yenagoa</option>
                        <option value="brass">Brass</option>
                        <option value="sagbama">Sagbama</option>
                    </optgroup>
            
                    <optgroup label="Benue">
                        <option value="makurdi">Makurdi</option>
                        <option value="gboko">Gboko</option>
                        <option value="otukpo">Otukpo</option>
                    </optgroup>
            
                    <optgroup label="Borno">
                        <option value="maiduguri">Maiduguri</option>
                        <option value="bama">Bama</option>
                        <option value="biu">Biu</option>
                    </optgroup>
            
                    <optgroup label="Cross River">
                        <option value="calabar">Calabar</option>
                        <option value="uyanga">Uyanga</option>
                        <option value="ogoja">Ogoja</option>
                    </optgroup>
            
                    <optgroup label="Delta">
                        <option value="asaba">Asaba</option>
                        <option value="warri">Warri</option>
                        <option value="sapele">Sapele</option>
                    </optgroup>
            
                    <optgroup label="Ebonyi">
                        <option value="abakaliki">Abakaliki</option>
                        <option value="afikpo">Afikpo</option>
                        <option value="onueke">Onueke</option>
                    </optgroup>
            
                    <optgroup label="Edo">
                        <option value="benin city">Benin City</option>
                        <option value="ekpoma">Ekpoma</option>
                        <option value="auchi">Auchi</option>
                    </optgroup>
            
                    <optgroup label="Ekiti">
                        <option value="ado ekiti">Ado Ekiti</option>
                        <option value="ikere ekiti">Ikere Ekiti</option>
                        <option value="ijero ekiti">Ijero Ekiti</option>
                    </optgroup>
            
                    <optgroup label="Enugu">
                        <option value="enugu">Enugu</option>
                        <option value="nsukka">Nsukka</option>
                        <option value="awgu">Awgu</option>
                    </optgroup>
            
                    <optgroup label="Gombe">
                        <option value="gombe">Gombe</option>
                        <option value="kaltungo">Kaltungo</option>
                        <option value="dadiya">Dadiya</option>
                    </optgroup>
            
                    <optgroup label="Imo">
                        <option value="owerri">Owerri</option>
                        <option value="orlu">Orlu</option>
                        <option value="okigwe">Okigwe</option>
                    </optgroup>
            
                    <optgroup label="Jigawa">
                        <option value="dutse">Dutse</option>
                        <option value="hadejia">Hadejia</option>
                        <option value="birnin kudu">Birnin Kudu</option>
                    </optgroup>
            
                    <optgroup label="Kaduna">
                        <option value="kaduna">Kaduna</option>
                        <option value="zaria">Zaria</option>
                        <option value="kafanchan">Kafanchan</option>
                    </optgroup>
            
                    <optgroup label="Kano">
                        <option value="kano">Kano</option>
                        <option value="bichi">Bichi</option>
                        <option value="dawakin tofa">Dawakin Tofa</option>
                    </optgroup>
            
                    <optgroup label="Katsina">
                        <option value="katsina">Katsina</option>
                        <option value="daura">Daura</option>
                        <option value="funtua">Funtua</option>
                    </optgroup>
            
                    <optgroup label="Kebbi">
                        <option value="birnin kebbi">Birnin Kebbi</option>
                        <option value="argungu">Argungu</option>
                        <option value="yauri">Yauri</option>
                    </optgroup>
            
                    <optgroup label="Kogi">
                        <option value="lokoja">Lokoja</option>
                        <option value="okene">Okene</option>
                        <option value="kabba">Kabba</option>
                    </optgroup>
            
                    <optgroup label="Kwara">
                        <option value="ilorin">Ilorin</option>
                        <option value="offa">Offa</option>
                        <option value="patigi">Patigi</option>
                    </optgroup>
            
                    <optgroup label="Lagos">
                        <option value="lagos" selected>Lagos (Mainland)</option>
                        <option value="ikeja">Ikeja</option>
                        <option value="victoria island">Victoria Island</option>
                        <option value="lekki">Lekki</option>
                        <option value="ajah">Ajah</option>
                        <option value="surulere">Surulere</option>
                        <option value="apapa">Apapa</option>
                        <option value="maryland">Maryland</option>
                        <option value="yaba">Yaba</option>
                    </optgroup>
            
                    <optgroup label="Nasarawa">
                        <option value="lafia">Lafia</option>
                        <option value="karu">Karu</option>
                        <option value="akeyi">Akeyi</option>
                    </optgroup>
            
                    <optgroup label="Niger">
                        <option value="minna">Minna</option>
                        <option value="bida">Bida</option>
                        <option value="suleja">Suleja</option>
                    </optgroup>
            
                    <optgroup label="Ogun">
                        <option value="abeokuta">Abeokuta</option>
                        <option value="sagamu">Sagamu</option>
                        <option value="ijebu ode">Ijebu Ode</option>
                    </optgroup>
            
                    <optgroup label="Ondo">
                        <option value="akure">Akure</option>
                        <option value="ondo">Ondo</option>
                        <option value="okitipupa">Okitipupa</option>
                    </optgroup>
            
                    <optgroup label="Osun">
                        <option value="osogbo">Osogbo</option>
                        <option value="ile ife">Ile-Ife</option>
                        <option value="ejigbo">Ejigbo</option>
                    </optgroup>
            
                    <optgroup label="Oyo">
                        <option value="ibadan">Ibadan</option>
                        <option value="ogbomoso">Ogbomoso</option>
                        <option value="oyo">Oyo</option>
                    </optgroup>
            
                    <optgroup label="Plateau">
                        <option value="jos">Jos</option>
                        <option value="bukuru">Bukuru</option>
                        <option value="shendam">Shendam</option>
                    </optgroup>
            
                    <optgroup label="Rivers">
                        <option value="port harcourt">Port Harcourt</option>
                        <option value="bori">Bori</option>
                        <option value="okrika">Okrika</option>
                    </optgroup>
            
                    <optgroup label="Sokoto">
                        <option value="sokoto">Sokoto</option>
                        <option value="wurno">Wurno</option>
                        <option value="tambuwal">Tambuwal</option>
                    </optgroup>
            
                    <optgroup label="Taraba">
                        <option value="jalingo">Jalingo</option>
                        <option value="wukari">Wukari</option>
                        <option value="bali">Bali</option>
                    </optgroup>
            
                    <optgroup label="Yobe">
                        <option value="damaturu">Damaturu</option>
                        <option value="potiskum">Potiskum</option>
                        <option value="nguru">Nguru</option>
                    </optgroup>
            
                    <optgroup label="Zamfara">
                        <option value="gusau">Gusau</option>
                        <option value="kaura namoda">Kaura Namoda</option>
                        <option value="bakkura">Bakkura</option>
                    </optgroup>
            
                    <optgroup label="Federal Capital Territory">
                        <option value="abuja">Abuja</option>
                        <option value="gwagwalada">Gwagwalada</option>
                        <option value="kuje">Kuje</option>
                    </optgroup>
                </select>
                
                <label for="street">Street</label>
                <input type="text" id="street" required>
                
                <label for="houseNumber">House Number</label>
                <input type="text" id="houseNumber" required>
                
                <button type="submit" >Done</button>
            </form>
        `;

        const edit = document.getElementById("profile-edits");
        const error = document.getElementById("error");

        edit.addEventListener("submit", async (e) => {
            e.preventDefault()
            error.textContent = "";

            const city = document.getElementById("nigerian-cities").value.trim();
            const street = document.getElementById("street").value.trim();
            const houseNumber = document.getElementById("houseNumber").value.trim()

            if(city == null || city === "") {
                error.textContent = "Please enter a city";
                return;
            }
            if(street == null || street === "") {
                error.textContent = "Please enter a street";
                return;
            }
            if(houseNumber == null || houseNumber === "") {
                error.textContent = "Please enter a houseNumber";
                return;
            }
            const Address = {
                city: city,
                street: street,
                houseNumber: houseNumber,
            }
            const formData = {
                role: user.role,
                userId: user.userId,
                address: Address
            }
            console.log(formData)


            try{
                const response = await fetch("http://localhost:8080/api/update/address", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })

                const result = await response.json();
                if(!response.ok){
                    console.log(result.message)
                    return
                }else{
                    localStorage.setItem("userProfile", JSON.stringify({
                        email: result.email,
                        address: result.address,
                        image: result.image
                    }))
                }


            }catch(e){
                error.textContent = e.message;
            }

            userProfile.innerHTML = `
                          <div class='user-pro'>
                            <label class="user-name">UserName</label>
                            <p>${userName}</p>
                            <label>Email</label>
                            <p>${user.email}</p>
                            <label>Address</label>
                            <p>${city},${street},${houseNumber}</p>
                          </div>`;
        })
    })


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
            } catch (errr) {
                console.error("Error submitting bid:", errr);
                message.textContent = "Error submitting bid.";
            }
        });
    });
}
