# Spotify Clone - Music Player

A responsive Spotify clone built with HTML, CSS, and JavaScript that allows users to play music from different playlists.

## Features

- 🎵 Music playback with play/pause functionality
- ⏮️⏭️ Previous/Next track navigation
- 🔊 Volume control with mute option
- 📊 Progress bar with seek functionality
- 📱 Responsive design
- 🎨 Multiple playlists (DANCE, WORKOUT, MELODY, JASSMANAK)

## Project Structure

```
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── utility.css         # Utility classes
├── script.js           # JavaScript functionality
├── public/
│   └── songs/
│       ├── songs-list.json  # Song metadata
│       ├── MELODY/          # Melody playlist
│       ├── DANCE/           # Dance playlist
│       ├── WORKOUT/         # Workout playlist
│       └── JASSMANAK/       # Jass Manak playlist
├── _redirects            # Netlify redirects
├── netlify.toml          # Netlify configuration
└── vercel.json           # Vercel configuration
```

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root directory)
4. Deploy!

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy settings:
   - Framework Preset: Other
   - Root Directory: `.` (root directory)
4. Deploy!

## Configuration Files

- `_redirects`: Handles SPA routing for Netlify
- `netlify.toml`: Configures headers for audio files on Netlify
- `vercel.json`: Configures headers and routing for Vercel
- `public/songs/songs-list.json`: Contains metadata for all songs

## Audio File Support

The project is configured to properly serve MP3 files with:
- Correct MIME type (`audio/mpeg`)
- Range request support for streaming
- Proper caching headers

## Local Development

To run locally with Live Server:

1. Install Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Audio files are stored in the `public/songs/` directory
- Each playlist has its own folder with MP3 files
- The `songs-list.json` file contains the metadata for all songs
- The application uses relative paths for deployment compatibility 