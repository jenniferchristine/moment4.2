"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const logOutBtn = document.getElementById("logoutBtn");

    logOutBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        logOut();
    });
});

function logOut() {
    localStorage.removeItem("token"); // ta bort token från localstorage
    window.location.href = "logout.html";
}

const token = localStorage.getItem("token");

if (!token) {
    localStorage.setItem("redirected", "true"); // lagrar redirected vid omdirigering
    window.location.href = "index.html";

} else {
    fetch("https://moment4-1.onrender.com/api/protected", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Något gick fel vid åtkomst av skyddad resurs");
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Protected route...") {

            } else {
                window.location.href = 'index.html'; // omdirigera om tokenen är ogiltig
            }
        })
        .catch(error => {
            console.error("Fel vid åtkomst av skyddad resurs:", error);
            window.location.href = 'index.html';
        });
}
