// ... (ton code de connexion, mémorisation, recherche, etc.)

function afficherVideos(username, filter = "") {
  // … (ton code normal)

  // Afficher la section musique exclusive seulement si connecté
  const musicSection = document.querySelector(".music-exclusive");
  if (utilisateur) {
    musicSection.style.display = "block";
  } else {
    musicSection.style.display = "none";
  }
}

// Au départ, lorsque le DOM se charge
window.addEventListener("DOMContentLoaded", () => {
  const musicSection = document.querySelector(".music-exclusive");
  musicSection.style.display = "none"; // caché par défaut
  // Le reste de ton code d'initialisation...
});
