// Sélecteurs
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const videosList = document.querySelector(".videos-list");
const searchInput = document.getElementById("searchInput");

// Comptes initiaux (provisoire)
const comptes = {
  "route87": "12345",
  "Oxi": "OxiPass1!",
  "Filou": "FilouPass2!",
  "Kyù": "KyuPass3!",
  "SuperCAT71": "SC71Pass4!"
};

let utilisateur = null;

// Musiques exclusives
const musiquesExclusives = [
  { titre: "Exclu 1", lien: "https://www.youtube.com/embed/lIxlL6mr2Ho" },
  { titre: "Exclu 2", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

// Musiques FarmTor
const musiquesFarmTor = [
  { titre: "FarmTor 1", lien: "https://www.youtube.com/embed/lIxlL6mr2Ho" },
  { titre: "FarmTor 2", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { titre: "FarmTor 3", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" }
];

// Vérification localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("utilisateur");
  if (savedUser) {
    utilisateur = JSON.parse(savedUser);
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    afficherVideos();
    afficherMusiques();
    afficherMesMusiques();
  } else effacerVideos();
});

// Connexion popup
loginBtn.addEventListener("click", () => {
  const popup = document.createElement("div");
  popup.className = "popup-login";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Connexion</h2>
      <input type="text" id="username" placeholder="Identifiant">
      <input type="password" id="password" placeholder="Mot de passe">
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
      afficherVideos();
      afficherMusiques();
      afficherMesMusiques();
    } else alert("Identifiant ou mot de passe incorrect ❌");
  });
});

// Inscription popup
signupBtn.addEventListener("click", () => {
  const popup = document.createElement("div");
  popup.className = "popup-login";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Créer un compte</h2>
      <input type="text" id="newUsername" placeholder="Identifiant">
      <input type="password" id="newPassword" placeholder="Mot de passe">
      <div class="popup-buttons">
        <button id="validerSignup">Créer</button>
        <button id="fermerPopup">Annuler</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById("fermerPopup").addEventListener("click", () => popup.remove());

  document.getElementById("validerSignup").addEventListener("click", () => {
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();
    if (!username || !password) return alert("Remplis tous les champs !");
    if (comptes[username]) return alert("Identifiant déjà utilisé !");
    comptes[username] = password;
    alert("Compte créé ✅ Tu peux maintenant te connecter.");
    popup.remove();
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
  document.getElementById("musiqueList").innerHTML = "";
});

// Mode sombre
let dark = false;
darkModeBtn.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
  darkModeBtn.textContent = dark ? "☀️ Mode clair" : "🌙 Mode sombre";
});

// Fonctions
function afficherVideos() {
  const videos = [
    { titre: "Sur la route - vlog #1", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titre: "Ma journée de chauffeur poids lourd", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" },
    { titre: "Conseils pour les longs trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
  ];
  videosList.innerHTML = '';
  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `<h3>${video.titre}</h3>
                      <iframe width="300" height="169" src="${video.lien}" frameborder="0" allowfullscreen></iframe>`;
    videosList.appendChild(card);
  });
}

function effacerVideos() {
  videosList.innerHTML = '<p style="text-align:center;">Connecte-toi pour voir les vidéos 🚛</p>';
}

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

function afficherMesMusiques() {
  const list = document.getElementById("musiqueList");
  list.innerHTML = "";
  musiquesFarmTor.forEach((musique, index) => {
    const div = document.createElement("div");
    div.style.margin = "1rem 0";
    div.innerHTML = `<h3>${musique.titre}</h3>
                     <iframe width="560" height="315" src="${musique.lien}" frameborder="0" allowfullscreen></iframe>
                     <br>
                     <button id="reload${index}">🔄 Ressourcer</button>`;
    list.appendChild(div);
    document.getElementById(`reload${index}`).addEventListener("click", () => {
      div.querySelector("iframe").src = musique.lien;
    });
  });
}

// Recherche
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".video-card").forEach(card => {
    const titre = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = titre.includes(query) ? "inline-block" : "none";
  });
});
