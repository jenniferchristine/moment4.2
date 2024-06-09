"use strict";

document.addEventListener("DOMContentLoaded", function() { // lyssnar efter omdirigering
    const redirected = localStorage.getItem("redirected"); // hämtar redirected i localstorage

    if (redirected === "true") {
        const popupDiv = document.getElementById("popup");

        if (popupDiv) {
            popupDiv.style.display = "block"; // visar box "du måste vara inloggad" om true

            const popupText = document.createTextNode("Du måste logga in för att se 'Mina sidor'");
            popupDiv.appendChild(popupText);
        }
        localStorage.removeItem("redirected"); // tar bort från localstorage
    }
});

async function logIn() {
    console.log("logIn-funktionen kallas...");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    console.log("Användarnamn:", username);
    console.log("Lösenord:", password);

    try { // skicka förfrågan till servern
        if (!username) { // felmeddelande gällande tomt användarnamn
            document.getElementById("usernameError").textContent = "Vänligen ange ett användarnamn";
        } 
        if (!password) { // felmeddelande gällande tomt lösenord
            document.getElementById("passwordError").textContent = "Skriv in ditt lösenord";
        }
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
            window.location.href = "secured.html"; // omdirigerar till säkrad sida
        } else {
            if (data.error === "Incorrect username or password") {
                document.getElementById("passwordError").textContent = "Felaktigt användarnamn eller lösenord";
            } else {
                console.error("Error", data.error);
            }
        }
    } catch (error) {
        console.error("Server error:", error);
        document.getElementById("usernameError").textContent = "Ett fel uppstod vid inloggningen. Vänligen försök igen senare.";
    }
}