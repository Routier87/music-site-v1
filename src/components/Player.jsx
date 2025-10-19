import React, { useEffect, useRef, useState } from 'react'

export default function Player({ track }) {
  const audioRef = useRef(null)
  const [src, setSrc] = useState(null)

  useEffect(() => {
    if (!track) return
    setSrc(track.url)
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.play().catch(() => {})
    }
  }, [track])

  if (!track) return <div className="player">Sélectionne un morceau pour jouer.</div>

  return (
    <div className="player">
      <h4>{track.title} — {track.artist}</h4>
      <audio ref={audioRef} controls>
        <source src={src} />
        Ton navigateur ne supporte pas l'audio.
      </audio>
    </div>
  )
}
