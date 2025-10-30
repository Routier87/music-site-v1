signupBtn.addEventListener("click", async () => {
  const email = prompt("Email :");
  const password = prompt("Mot de passe :");
  if (!email || !password) return alert("Remplis tous les champs !");

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message);

  // Demander le code reçu par mail
  if (res.ok) {
    const code = prompt("Entre le code reçu par mail :");
    const verifyRes = await fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code })
    });
    const verifyData = await verifyRes.json();
    alert(verifyData.message);
  }
});
