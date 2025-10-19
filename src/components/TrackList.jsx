import React from 'react'
import { supabase } from '../supabaseClient'

function getPublicUrl(path) {
  const { data } = supabase.storage.from('tracks').getPublicUrl(path)
  return data.publicUrl
}

export default function TrackList({ tracks, onPlay }) {
  return (
    <div className="tracklist">
      <h3>Liste des morceaux</h3>
      <ul>
        {tracks.map(t => (
          <li key={t.id} onClick={() => onPlay({...t, url: getPublicUrl(t.path)})}>
            <strong>{t.title}</strong> <small>— {t.artist}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
