import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function UploadTrack({ onUploadComplete }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return alert('Choisis un fichier .mp3')
    setLoading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`
    const filePath = `tracks/${fileName}`

    const { error: uploadError } = await supabase.storage.from('tracks').upload(filePath, file, { cacheControl: '3600', upsert: false })
    if (uploadError) {
      setLoading(false)
      return alert('Erreur upload: ' + uploadError.message)
    }

    const { error: insertError } = await supabase.from('tracks').insert({ title, artist, path: filePath })
    if (insertError) {
      setLoading(false)
      return alert('Erreur DB: ' + insertError.message)
    }

    setTitle('')
    setArtist('')
    setFile(null)
    setLoading(false)
    onUploadComplete && onUploadComplete()
    alert('Fichier uploadé avec succès !')
  }

  return (
    <form className="upload" onSubmit={handleUpload}>
      <h3>Uploader une musique</h3>
      <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Artiste" value={artist} onChange={e => setArtist(e.target.value)} />
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} />
      <button type="submit" disabled={loading}>{loading ? 'Upload...' : 'Uploader'}</button>
    </form>
  )
}
