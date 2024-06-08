"use strict";

const registerForm = document.getElementById("register-form");
const registerBtn = document.getElementById("registerBtn");

registerForm.addEventListener('keydown', async (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); await addUser();
    }
});

registerBtn.addEventListener('click', async () => {
    await addUser();
});

async function addUser() {
    const username = document.getElementById("username").value; // hämta värde från inputs
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;

    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("firstnameError").textContent = "";
    document.getElementById("lastnameError").textContent = "";
    document.getElementById("emailError").textContent = "";

    const User = { // skapar objekt för insamlad data
        username: username, // värde för varje nyckel
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email
    };

    const url = "https://moment4-1.onrender.com/api/register";

    try {
        const response = await fetch(url, {
            method: 'POST', //postförfrågan
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });

        const data = await response.json();

        if (!response.ok) {
            await handleValidation(data.errors);
            throw new Error(data.message || "Failed to add data");
        }

        document.getElementById('username').value = ""; // töm fält efter tillägg
        document.getElementById('password').value = "";
        document.getElementById('firstname').value = "";
        document.getElementById('lastname').value = "";
        document.getElementById('email').value = "";

        console.log("Data added", data);

        const confirmationDiv = document.getElementById("confirmation");
        confirmationDiv.innerHTML = `Du är nu registrerad, ${firstname}! <br> 
        <p class="text">> Klicka <a href="index.html">här</a> för att logga in<p>`;
        confirmationDiv.style.display = "block";

    } catch (error) {
        console.error("Error when adding data", error);
    }
}

function handleValidation(errors) {
    if (errors) {
        if (errors.username) {
            document.getElementById("usernameError").textContent = errors.username;
        }
        if (errors.password) {
            document.getElementById("passwordError").textContent = errors.password;
        }
        if (errors.firstname) {
            document.getElementById("firstnameError").textContent = errors.firstname;
        }
        if (errors.lastname) {
            document.getElementById("lastnameError").textContent = errors.lastname;
        }
        if (errors.email) {
            document.getElementById("emailError").textContent = errors.email;
        }
    } else {
        console.error("Validation errors object is undefined");
    }
}