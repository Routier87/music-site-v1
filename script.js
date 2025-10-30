// Connexion locale + mémorisation + recherche
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const videosList = document.querySelector(".videos-list");
const authDiv = document.getElementById("auth");
const searchInput = document.getElementById("searchInput");

// Comptes utilisateurs
const comptes = {
  "route87": "r87Pass!23",
  "Oxi": "Oxi_2025",
  "Filou": "Filou#99",
  "Kyù": "Kyu-1love",
  "SuperCAT71": "SC71-power!"
};

let utilisateur = null;

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
  document.get
