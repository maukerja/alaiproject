# Vibe Check ✨

Vibe Check adalah website interaktif untuk mengetahui vibe pengguna berdasarkan beberapa pertanyaan sederhana.

## Fitur

- Tombol mulai yang kabur 😭
- Puzzle kata CANTIK
- Input nama
- 3 pertanyaan tentang mood
- Hasil vibe personal
- Rating chill, energy, dan chaos
- Rekomendasi lagu random
- Spotify player langsung di halaman
- Responsive untuk mobile dan desktop
- Fallback lagu jika Spotify API gagal

## Struktur Project

```text
vibe-check/
│
├── index.html
├── package.json
├── vercel.json
├── README.md
│
├── api/
│   └── spotify.js
│
└── assets/
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   └── app.js
    │
    ├── data/
    │   └── songs.json
    │
    └── audio/