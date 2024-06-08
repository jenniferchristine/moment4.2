"use strict";

async function logIn() {
    console.log("logIn-funktionen kallas...");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Användarnamn:", username);
    console.log("Lösenord:", password);

    if (!username || !password) {
        alert("Fyll i både lösenord och användarnamn");
        return;
    }

    // skicka förfrågan till servern
    try {
        const response = await fetch("https://moment4-1.onrender.com/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        console.log("Svarsdata:", data);

        if (response.ok) {
            localStorage.setItem("token", data.response.token); // lagra token
            console.log("Token:", data.response.token);
        } else {
            console.log("Error", data.error);
        }
    } catch (error) {
        console.error("Servererror:", error);
    }
}