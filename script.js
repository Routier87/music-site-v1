const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const videosList = document.querySelector(".videos-list");
const searchInput = document.getElementById("searchInput");

// Comptes utilisateurs initiaux
const comptes = {
  "routier87": "878797",
  "Oxi": "OxiPass1!",
  "Filou": "FilouPass2!",
  "Kyù": "KyuPass3!",
  "SuperCAT71": "SC71Pass4!"
};

// Mémorisation utilisateur
let utilisateur = null;

// Mémorisation locale
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
    } else alert("Identifiant ou mot de passe incorrect ❌");
  });
});

// Popup inscription
signupBtn.addEventListener("click", () => {
  const popup = document.createElement("div");
  popup.className = "popup-login";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Créer un compte</h2>
      <input type="text" id="newUsername" placeholder="Identifiant" required>
      <input type="password" id="newPassword" placeholder="Mot de passe" required>
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
    if (!username || !password) return alert("Veuillez remplir tous les champs ❌");
    if (comptes[username]) return alert("Cet identifiant existe déjà ❌");
    comptes[username] = password;
    alert("Compte créé ✅. Tu peux maintenant te connecter.");
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
});

// Musiques exclusives
const musiquesExclusives = [
  { titre: "Exclu 1", lien: "https://www.youtube.com/embed/lIxlL6mr2Ho" },
  { titre: "Exclu 2", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

function afficherMusiques() {
  const section = document.querySelector(".music-exclusive");
  section.innerHTML = "<h2>🎵 Musiques Exclusives</h2>";
  musiquesExclusives.forEach(musique => {
    const div = document.createElement("div");
    div.style.margin = "1rem 0";
    div.innerHTML = `<h3>${musique.titre}</h3>
                     <iframe width="560" height="315" src="${musique
