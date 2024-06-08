"use strict";

const token = localStorage.getItem("token");
console.log(token);

if (!token) {
    console.log("Ingen token hittad. Omdirigerar till index.html");
    window.location.href = 'index.html'; // omdirigera om ingen token finns
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
            document.getElementById("secured-content").innerText = "Tillgång till skyddad sida";
        } else {
            console.log("Ogiltig token. Omdirigerar till index.html.");
            window.location.href = 'index.html'; // omdirigera om tokenen är ogiltig
        }
    })
    .catch(error => {
        console.error("Fel vid åtkomst av skyddad resurs:", error);
        alert("Ett fel uppstod vid åtkomst av skyddad resurs. Omdirigerar till index.html.");
        window.location.href = 'index.html'; // omdirigera vid fel
    });
}

function logOut() {
    localStorage.removeItem("token"); // Ta bort token från localStorage
    window.location.href = "logout.html"; // Omdirigera användaren till utloggningssidan eller till startsidan
}
