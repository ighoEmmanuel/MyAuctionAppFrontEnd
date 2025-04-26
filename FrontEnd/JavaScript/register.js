document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-user');
    const error = document.getElementById("error-message");
    const roleSelect = document.getElementById("role");


    form.addEventListener('submit', async function (event) {
        event.preventDefault();


        error.textContent = "";

        const userName = document.getElementById("userName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            error.textContent = "⚠️ Please password doesn't match";
            return;
        }
        if(password.length < 6) {
            error.textContent = "The password is too short";
            return;
        }
        const formData ={
            userName: userName,
            email: email,
            password: password,
        }

        const selectedRole = roleSelect.value;

        try{
            const response = await fetch((`http://localhost:8080/api/register/${selectedRole}`),{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (!response.ok) {
                error.textContent = result.message;
            }else{
                // private String bidderId;
                // private String bidderName;
                // private String bidderEmail;
                // private Profile profile
                localStorage.setItem("userData", JSON.stringify({
                    userName: result.userName,
                    email: result.email,
                    id: result.id,
                    profile: result.profile
                }));
                console.log(selectedRole);
                if(selectedRole === "bidder"){
                    window.location.href = "../Html/BidderDashBoard.html";
                }else{
                    window.location.href = "../Html/SellerDashBoard.html";
                }
            }
        }catch(error){
            alert(error.value);
            error.textContent = "⚠️ Failed to connect to the server."
        }

    })
})