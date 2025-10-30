// ================================
// 🚚 YouTube Routier 87
// Script principal du site
// ================================

// Import Firebase depuis le CDN (aucune installation nécessaire)
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ================================
// 🔧 Configuration Firebase
// (à remplacer par ta propre config depuis la console Firebase)
// ================================
const firebaseConfig = {
  apiKey: "TA_CLE_API",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_BUCKET.appspot.com",
  messagingSenderId: "TON_ID",
  appId: "TON_APP_ID"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ================================
// 🎛️ Sélecteurs du DOM
// ================================
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const videosList = document.querySelector('.videos-list');
const header = document.querySelector('header');

// ================================
// 👤 Gestion de l'authentification
// ================================

// Connexion avec Google
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      alert(`Bienvenue ${user.displayName} 🚛`);
    })
    .catch(err => console.error('Erreur connexion :', err));
});

// Déconnexion
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('Tu es déconnecté 👋');
  });
});

// Mise à jour dynamique selon l'état de connexion
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    afficherVideos();
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    effacerVideos();
  }
});

// ================================
// 🎬 Gestion des vidéos affichées
// ================================

function afficherVideos() {
  const videos = [
    { titre: "Sur la route - vlog #1", lien: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { titre: "Ma journée de chauffeur poids lourd", lien: "https://www.youtube.com/embed/TUVcZfQe-Kw" },
    { titre: "Conseils pour les longs trajets", lien: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
  ];

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
// 🌙 Optionnel : mode sombre
// ================================
const darkModeBtn = document.createElement('button');
darkModeBtn.textContent = '🌙 Mode sombre';
darkModeBtn.style.marginLeft = '1rem';
header.appendChild(darkModeBtn);

let dark = false;
darkModeBtn.addEventListener('click', () => {
  dark = !dark;
  document.body.style.background = dark ? '#111' : '#f9f9f9';
  document.body.style.color = dark ? '#f9f9f9' : '#111';
  darkModeBtn.textContent = dark ? '☀️ Mode clair' : '🌙 Mode sombre';
});
