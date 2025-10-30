// ================================
// 🚚 YouTube Routier87 — Connexion locale avec mémorisation
// ================================

// 🎛️ Sélecteurs du DOM
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const videosList = document.querySelector(".videos-list");
const authDiv = document.getElementById("auth");

// ================================
// 👤 Comptes et mots de passe
// ================================
const comptes = {
  "route87": "r87Pass!23",
  "Oxi": "Oxi_2025",
  "Filou": "Filou#99",
  "Kyù": "Kyu-1love",
  "SuperCAT71": "SC71-power!"
};

let utilisateur = null;

// ================================
// 🔁 Vérifie si un utilisateur est déjà connecté
// ================================
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("utilisateur");
  if (savedUser) {
    utilisateur = JSON.parse(savedUser);
    showMessage(`Bienvenue de retour ${utilisateur.nom} 🚛`, "info");
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    afficherVideos(utilisateur.nom);
  } else {
    effacerVideos();
  }
});

// ================================
// 🔓 Connexion via popup
// ================================
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
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur)); // ✅ sauvegarde
      showMessage(`Bienvenue ${username} 🚛`, "success");
      popup.remove();
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      afficherVideos(username);
    } else {
      showMessage("Identifiant ou mot de passe incorrect ❌", "error");
    }
  });
});

// ================================
// 🚪 Déconnexion
// ================================
logoutBtn.addEventListener("click", () => {
  utilisateur = null;
  localStorage.removeItem("utilisateur"); // ❌ supprime la sauvegarde
  showMessage("Tu es déconnecté 👋", "info");
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  effacerVideos();
});

// ================================
// 🎬 Gestion des vidéos
// ================================
function afficherVideos(username) {
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

  const videos = personnalisations[username] || baseVideos;
  videosList.innerHTML = "<h2>Vidéos recommandées</h2>";

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

function effacerVideos() {
  videosList.innerHTML = "<h2>Vidéos recommandées</h2><p style='text-align:center;'>Connecte-toi pour voir les vidéos 🚛</p>";
}

// ================================
// 💬 Messages temporaires
// ================================
function showMessage(msg, type = "info") {
  const box = document.createElement("div");
  box.textContent = msg;
  box.className = `msg ${type}`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);
}

// ================================
// 🌙 Mode sombre
// ================================
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙 Mode sombre";
darkModeBtn.style.marginLeft = "1rem";
authDiv.appendChild(darkModeBtn);

let dark = false;
darkModeBtn.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
  darkModeBtn.textContent = dark ? "☀️ Mode clair" : "🌙 Mode sombre";
});
