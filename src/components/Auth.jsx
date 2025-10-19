import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')

  async function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return alert(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) return alert(error.message)
      alert('Vérifie ta boîte mail pour confirmer ton compte (si activé).')
    }
  }

  return (
    <div className="auth">
      <h2>{mode === 'login' ? 'Se connecter' : "S'inscrire"}</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" />
        <button type="submit">{mode === 'login' ? 'Se connecter' : "S'inscrire"}</button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? "Créer un compte" : "J'ai déjà un compte"}
      </button>
    </div>
  )
}
