"use strict";

async function authorizeUser() {
    try { 
        const token = localStorage.getItem("token");

        if (!token) {
            localStorage.setItem("redirected", "true");
            throw new Error("Misslyckad auktoriserad - Token saknas");
        }

        // kontrollera skyddad resurs
        const response = await fetch("https://moment4-1.onrender.com/api/protected", {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`Något gick fel vid åtkomst av skyddad resurs: ${response.statusText}`);
        }
        // hämta användaruppgifter
        const userInfo = await response.json();
        displayUser(userInfo);

    } catch (error) {
        console.error("Fel vid åtkomst av skyddad resurs:", error);
        window.location.href = 'index.html';
    }
}

function displayUser(user) {
    const usernameElement = document.getElementById("username");
    const firstnameElement = document.getElementById("firstname");
    const lastnameElement = document.getElementById("lastname");
    const emailElement = document.getElementById("email");

    if (usernameElement && firstnameElement && lastnameElement && emailElement) {
        usernameElement.textContent = user.username || "Ej tillgänglig";
        firstnameElement.textContent = user.firstname || "Ej tillgänglig";
        lastnameElement.textContent = user.lastname || "Ej tillgänglig";
        emailElement.textContent = user.email || "Ej tillgänglig";
    } else {
        console.error("Ett eller flera DOM-element kunde inte hittas.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const logOutBtn = document.getElementById("logoutBtn");

    logOutBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        logOut();
    });

    authorizeUser();
});

function logOut() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}