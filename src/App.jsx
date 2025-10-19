import React, { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth'
import UploadTrack from './components/UploadTrack'
import TrackList from './components/TrackList'
import Player from './components/Player'

export default function App() {
  const [session, setSession] = useState(null)
  const [tracks, setTracks] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(r => setSession(r.data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess))
    fetchTracks()
    return () => { listener?.subscription?.unsubscribe && listener.subscription.unsubscribe() }
  }, [])

  async function fetchTracks() {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return console.error(error)
    setTracks(data || [])
  }

  return (
    <div className="app">
      <header>
        <h1>Ma Plateforme de Musique V3</h1>
      </header>

      <main>
        {!session ? (
          <Auth />
        ) : (
          <div>
            <p>Connecté : {session.user.email}</p>
            <UploadTrack onUploadComplete={fetchTracks} />
          </div>
        )}

        <TrackList tracks={tracks} onPlay={(t) => setCurrent(t)} />
        <Player track={current} />
      </main>

      <footer>© 2025 - Ton Site</footer>
    </div>
  )
}
