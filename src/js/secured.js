"use strict";

const token = localStorage.getItem("token");
console.log(token);

if (!token) {
    localStorage.setItem("redirected", "true"); // lagrar redirected vid omdirigering
    window.location.href = "index.html";
} else {
    console.log("Token hittad:", token);

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
        console.log("Skyddad resursdata:", data);
        if (data.message === "Protected route...") {
            console.log("Användaren är inloggad och har tillgång till skyddad sida");
        } else {
            console.log("Ogiltig token. Omdirigerar till index.html.");
            window.location.href = 'index.html'; // omdirigera om tokenen är ogiltig
        }
    })
    .catch(error => {
        console.error("Fel vid åtkomst av skyddad resurs:", error);
        window.location.href = 'index.html';
    });
}

function logOut() {
    localStorage.removeItem("token"); // ta bort token från localstorage
    window.location.href = "logout.html";
}
