const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const videosList = document.querySelector(".videos-list");
const searchInput = document.getElementById("searchInput");

// Comptes utilisateurs initiaux
const comptes = {
  "route87": "12345",
  "Oxi": "OxiPass1!",
  "Filou": "FilouPass2!",
  "Kyù": "KyuPass3!",
  "SuperCAT71": "SC71Pass4!"
};

// Tableau de musiques exclusives
const musiquesExclusives = [
  { titre: "Exclu 1", lien: "https://www.youtube.com/embed/lIxlL6mr2Ho" },
  { titre: "Exclu 2", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

let utilisateur = null;

// Vérification mémoire locale
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("utilisateur");
  if (savedUser) {
    utilisateur = JSON.parse(savedUser);
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    afficherVideos(utilisateur.nom);
    afficherMusiques();
  } else {
    effacerVideos();
  }
});

// Popup connexion
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
      popup.remove();
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      afficherVideos(username);
      afficherMusiques();
    } else {
      alert("Identifiant ou mot de passe incorrect ❌");
    }
  });
});

// Déconnexion
logoutBtn.addEventListener("click", () => {
  utilisateur = null;
  localStorage.removeItem("utilisateur");
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  effacerVideos();
  document.querySelector(".music-exclusive").innerHTML = "<h2>🎵 Musiques Exclusives</h2>";
});

// Affichage vidéos
function afficherVideos(username, filter = "") {
  const videos = [
    { titre: "Sur la route - vlog #1", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titre: "Ma journée de chauffeur poids lourd", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" },
    { titre: "Conseils pour les longs trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" }
  ];

  videosList.innerHTML = "<h2>Vidéos recommandées</h2>";
  videos.forEach(video => {
    if (!filter || video.titre.toLowerCase().includes(filter.toLowerCase())) {
      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `<h3>${video.titre}</h3>
                        <iframe width="300" height="169" src="${video.lien}" frameborder="0" allowfullscreen></iframe>`;
      videosList.appendChild(card);
    }
  });
}

// Effacer vidéos
function effacerVideos() {
  videosList.innerHTML = "<h2>Vidéos recommandées</h2><p style='text-align:center;'>Connecte-toi pour voir les vidéos 🚛</p>";
}

// Affichage musiques exclusives
function afficherMusiques() {
  const section = document.querySelector(".music-exclusive");
  section.innerHTML = "<h2>🎵 Musiques Exclusives</h2>";
  musiquesExclusives.forEach(musique => {
    const div = document.createElement("div");
    div.style.margin = "1rem 0";
    div.innerHTML = `<h3>${musique.titre}</h3>
                     <iframe width="560" height="315" src="${musique.lien}" frameborder="0" allowfullscreen></iframe>`;
    section.appendChild(div);
  });
}

// Recherche dynamique
searchInput.addEventListener("input", () => {
  if (!utilisateur) return;
  afficherVideos(utilisateur.nom, searchInput.value);
});

// Mode sombre
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙 Mode sombre";
darkModeBtn.style.marginLeft = "1rem";
document.getElementById("auth").appendChild(darkModeBtn);

let dark = false;
darkModeBtn.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
  darkModeBtn.textContent = dark ? "☀️ Mode clair" : "🌙 Mode sombre";
});
