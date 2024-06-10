"use strict";

async function authorizeUser() {
    try { const token = localStorage.getItem("token");

        if (!token) {
            localStorage.setItem("redirected", "true"); // lagrar redirected vid omdirigering
            throw new Error("Misslyckad auktoriserad - Token saknas");
        }
        const response = await fetch("https://moment4-1.onrender.com/api/protected", {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Något gick fel vid åtkomst av skyddad resurs");
        }
        const data = await response.json();

        if (data.message !== "Protected route...") {
            throw new Error("Token ogiltig");
        }
    } catch (error) {
        console.error("Fel vid åtkomst av skyddad resurs:", error);
        window.location.href = 'index.html';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const logOutBtn = document.getElementById("logoutBtn");

    logOutBtn.addEventListener("click", async function (e) {
        e.preventDefault(); logOut();
    });
});

function logOut() {
    localStorage.removeItem("token"); // ta bort token från localstorage
    window.location.href = "index.html";
}

authorizeUser();