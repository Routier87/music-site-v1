const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Stockage temporaire des utilisateurs et codes (à remplacer par une base de données)
let users = {};
let codes = {};

// Configuration du transporteur mail (ici Gmail, à adapter)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ton.email@gmail.com",       // ton email
    pass: "tonmotdepasseappli"         // mot de passe d'application Gmail
  }
});

// Route inscription
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (users[email]) return res.status(400).json({ message: "Email déjà utilisé" });

  // Générer un code de confirmation
  const code = Math.floor(100000 + Math.random() * 900000);
  codes[email] = code;

  // Envoyer email
  transporter.sendMail({
    from: '"Routier87" <ton.email@gmail.com>',
    to: email,
    subject: "Code de vérification Routier87",
    text: `Votre code de vérification est : ${code}`
  }).then(() => {
    users[email] = { password, verified: false };
    res.json({ message: "Email envoyé avec le code de vérification" });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'envoi du mail" });
  });
});

// Route vérification du code
app.post("/verify", (req, res) => {
  const { email, code } = req.body;
  if (!users[email]) return res.status(400).json({ message: "Utilisateur introuvable" });
  if (codes[email] != code) return res.status(400).json({ message: "Code incorrect" });

  users[email].verified = true;
  delete codes[email];
  res.json({ message: "Compte vérifié avec succès !" });
});

// Route login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!users[email] || users[email].password !== password)
    return res.status(400).json({ message: "Email ou mot de passe incorrect" });
  if (!users[email].verified)
    return res.status(400).json({ message: "Email non vérifié" });
  res.json({ message: "Connexion réussie" });
});

app.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));
