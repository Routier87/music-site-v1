// ================================
// 🚚 YouTube Routier 87 - Connexion locale multi-utilisateurs (mots de passe séparés)
// ================================

// 🎛️ Sélecteurs du DOM
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const videosList = document.querySelector('.videos-list');
const header = document.querySelector('header');

// ================================
// 👤 Comptes autorisés et mots de passe (temporaire — modifie-les à volonté)
// ================================
const comptes = {
  "route87":   "r87Pass!23",
  "Oxi":       "Oxi_2025",
  "Filou":     "Filou#99",
  "Kyù":       "Kyu-1love",   // si ton éditeur gêne l'accent, remplace par "Kyu-1love"
  "SuperCAT71":"SC71-power!"
};

// Pour debug rapide (optionel) : afficher les comptes dans la console (retire en production)
console.info("Comptes de test :", Object.keys(comptes));

// ================================
// État utilisateur
// ================================
let utilisateur = null;

// ================================
// 🔐 Connexion
// ================================
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (comptes[username] && comptes[username] === password) {
    utilisateur = { nom: username };
    showMessage(`Bienvenue ${username} 🚛`, 'success');
    loginForm.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    afficherVideosForUser(username);
  } else {
    showMessage('Identifiant ou mot de passe incorrect ❌', 'error');
  }
});

// ================================
// 🚪 Déconnexion
// ================================
logoutBtn.addEventListener('click', () => {
  utilisateur = null;
  showMessage('Tu es déconnecté 👋', 'info');
  loginForm.style.display = 'block';
  logoutBtn.style.display = 'none';
  effacerVideos();
});

// ================================
// 🎬 Gestion des vidéos (option : personnalisation par utilisateur)
// ================================
function afficherVideosForUser(username) {
  // Exemple : si tu veux des vidéos spécifiques par utilisateur, personnalise ici.
  const baseVideos = [
    { titre: "Sur la route - vlog #1", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titre: "Ma journée de chauffeur poids lourd", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" },
    { titre: "Conseils pour les longs trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
  ];

  // Exemples simples de vidéos personnalisées (tu peux remplacer les listes)
  const personnalisations = {
    "Filou": [
      { titre: "Filou : astuces camions", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ],
    "Oxi": [
      { titre: "Oxi : routes de nuit", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" }
    ],
    "Kyù": [
      { titre: "Kyù : optimisation trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" }
    ],
    "SuperCAT71": [
      { titre: "SuperCAT71 : mécanique rapide", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ],
    "route87": baseVideos
  };

  const videos = personnalisations[username] || baseVideos;

  videosList.innerHTML = '';
  videos.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <h3>${video.titre}</h3>
      <iframe width="300" height="169" src="${video.lien}" frameborder="0" allowfullscreen></iframe>
    `;
    videosList.appendChild(card);
  });
}

function effacerVideos() {
  videosList.innerHTML = '<p style="text-align:center;">Connecte-toi pour voir les vidéos 🚛</p>';
}

// ================================
// 🌙 Mode sombre
// ================================
const darkModeBtn = document.createElement('button');
darkModeBtn.textContent = '🌙 Mode sombre';
darkModeBtn.style.marginLeft = '1rem';
header.appendChild(darkModeBtn);

let dark = false;
darkModeBtn.addEventListener('click', () => {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  darkModeBtn.textContent = dark ? '☀️ Mode clair' : '🌙 Mode sombre';
});

// ================================
// 💬 Système de notification
// ================================
function showMessage(msg, type = 'info') {
  const box = document.createElement('div');
  box.textContent = msg;
  box.className = `msg ${type}`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);
}
