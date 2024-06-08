"use strict";

async function logIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Fyll i både lösenord och användarnamn");
    }

    // skicka förfrågan till servern
    try {
        const response = await fetch("https://moment4-1.onrender.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            document.getElementById("confirmation").innerText = data.response.message;
            localStorage.setItem("token", data.response.token); // lagra token
            console.log(token);
        } else {
            document.getElementById("confirmation").innerText = data.error; // felmeddelande för test
        }
    } catch (error) {
        document.getElementById("confirmation").innerText = "Serverfel";
    }
}