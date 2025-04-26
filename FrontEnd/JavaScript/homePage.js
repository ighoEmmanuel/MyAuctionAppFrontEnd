document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-user");
    const error = document.getElementById("error-message");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;

        error.textContent = "";

        if (email === "") {
            error.textContent = "⚠️ Please Enter a valid email!";
            return;
        }

        const password = document.getElementById("password").value;

        const formData = {
            email: email,
            password: password
        };

        try{
            const response = await fetch(`http://localhost:8080/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formData)
            });

            const result = await response.json();
            console.log(result);

            if (!response.ok) {
                error.textContent = result.message;
                return;
            }else{
                localStorage.setItem('userData', JSON.stringify({
                    userId: result.id,
                    userName: result.username,
                    role: result.role,
                    email: result.email
                }));
                const user = JSON.parse(localStorage.getItem("userData"));
                // console.log(user)
                if(result.role === "Bidder"){
                    window.location.href = "../Html/BidderDashBoard.html";
                }else{
                    window.location.href = "../Html/SellerDashBoard.html";
                }
            }
        }catch(error){
            alert(error.value);
            error.textContent = "⚠️ Failed to connect to the server.";
        }
    })

});
