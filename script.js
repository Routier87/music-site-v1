// Import des outils Firebase (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔧 Configuration Firebase (à remplacer par la tienne depuis https://console.firebase.google.com)
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_DOMAINE.firebaseapp.com",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_BUCKET.appspot.com",
  messagingSenderId: "TON_ID",
  appId: "TON_APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sélecteurs
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Connexion
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(result => console.log('Connecté :', result.user.displayName))
    .catch(err => console.error(err));
});

// Déconnexion
logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// Mise à jour de l'état de connexion
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
});
