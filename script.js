// Connexion locale + mémorisation + recherche
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const videosList = document.querySelector(".videos-list");
const authDiv = document.getElementById("auth");
const searchInput = document.getElementById("searchInput");

const comptes = {
  "routie87": "r87Pass!23",
  "Oxi": "Oxi_2025",
  "Filou": "Filou@08",
  "Kyù": "Kyu-1love",
  "SuperCAT71": "SC71-power!"
  "Farm": "Patron01"
};

let utilisateur = null;

// -----------------------------
// Vérification mémoire locale
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("utilisateur");
  if (savedUser) {
    utilisateur = JSON.parse(savedUser);
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    afficherVideos(utilisateur.nom);
  } else {
    effacerVideos();
  }
});

// -----------------------------
// Connexion popup
loginBtn.addEventListener("click", () => {
  if (utilisateur) return;
  const popup = document.createElement("div");
  popup.className = "popup-login";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Connexion</h2>
      <input type="text" id="username" placeholder="Identifiant" required>
      <input type="password" id="password" placeholder="Mot de passe" required>
      <div class="popup-buttons">
        <button id="validerLogin">Connexion</button>
        <button id="fermerPopup">Annuler</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("fermerPopup").addEventListener("click", () => popup.remove());
  document.getElementById("validerLogin").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (comptes[username] && comptes[username] === password) {
      utilisateur = { nom: username };
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
      showMessage(`Bienvenue ${username} 🚛`, "success");
      popup.remove();
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      afficherVideos(username);
    } else showMessage("Identifiant ou mot de passe incorrect ❌", "error");
  });
});

// -----------------------------
// Déconnexion
logoutBtn.addEventListener("click", () => {
  utilisateur = null;
  localStorage.removeItem("utilisateur");
  showMessage("Tu es déconnecté 👋", "info");
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  effacerVideos();
});

// -----------------------------
// Recherche dynamique
searchInput.addEventListener("input", () => {
  if (!utilisateur) return;
  const query = searchInput.value.toLowerCase();
  afficherVideos(utilisateur.nom, query);
});

// -----------------------------
// Affichage vidéos
function afficherVideos(username, filter = "") {
  const baseVideos = [
    { titre: "Sur la route - vlog #1", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titre: "Ma journée de chauffeur poids lourd", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" },
    { titre: "Conseils pour les longs trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
  ];

  const personnalisations = {
    "Filou": [{ titre: "Filou : astuces camions", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
    "Oxi": [{ titre: "Oxi : routes de nuit", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" }],
    "Kyù": [{ titre: "Kyù : optimisation trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" }],
    "SuperCAT71": [{ titre: "SuperCAT71 : mécanique rapide", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
    "route87": baseVideos
  };

  let videos = personnalisations[username] || baseVideos;
  if (filter.trim() !== "") videos = videos.filter(v => v.titre.toLowerCase().includes(filter));

  videosList.innerHTML = "<h2>Vidéos recommandées</h2>";
  if (videos.length === 0) videosList.innerHTML += "<p style='text-align:center;'>Aucune vidéo trouvée 😕</p>";

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <h3>${video.titre}</h3>
      <iframe width="300" height="169" src="${video.lien}" frameborder="0" allowfullscreen></iframe>
    `;
    videosList.appendChild(card);
  });
}

// -----------------------------
// Effacer vidéos
function effacerVideos() {
  videosList.innerHTML = "<h2>Vidéos recommandées</h2><p style='text-align:center;'>Connecte-toi pour voir les vidéos 🚛</p>";
}

// -----------------------------
// Notifications
function showMessage(msg, type = "info") {
  const box = document.createElement("div");
  box.textContent = msg;
  box.className = `msg ${type}`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);
}

// -----------------------------
// Mode sombre
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙 Mode sombre";
darkModeBtn.style.marginLeft = "1rem";
authDiv.appendChild(darkModeBtn);

let dark = false;
darkModeBtn.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
  darkModeBtn.textContent = dark
