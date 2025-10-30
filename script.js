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
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    afficherVideos();
    afficherMusiques();
    afficherMesMusiques();
  } else effacerVideos();
});

// Connexion popup
loginBtn.addEventListener("click", () => {
  showPopup("Connexion", "username", "password", (username, password) => {
    if (comptes[username] && comptes[username] === password) {
      utilisateur = { nom: username };
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
      loginBtn.style.display = "none";
      signupBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      afficherVideos();
      afficherMusiques();
      afficherMesMusiques();
      return true;
    } else {
      alert("Identifiant ou mot de passe incorrect ❌");
      return false;
    }
  });
});

// Inscription popup
signupBtn.addEventListener("click", () => {
  showPopup("Créer un compte", "newUsername", "newPassword", (username, password) => {
    if (!username || !password) return alert("Remplis tous les champs !");
    if (comptes[username]) return alert("Identifiant déjà utilisé !");
    comptes[username] = password;
    alert("Compte créé ✅ Tu peux maintenant
