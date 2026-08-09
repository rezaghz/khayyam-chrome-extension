# Khayyam - Chrome Extension

A Chrome extension that displays Omar Khayyam's quatrains (رباعیات خیام) on every new tab, with audio playback support.

## Features

- **Random Quatrains**: Each new tab displays a random quatrain from Khayyam's collection
- **Audio Playback**: Listen to recitations of each quatrain (106 OGG audio files)
- **Dark/Light Theme**: Toggle between dark and light themes with persistent preference
- **RTL Persian Text**: Full right-to-left support with Vazirmatn font
- **Keyboard Navigation**: Arrow keys, Space/Enter for audio, R for random
- **Responsive Design**: Works on desktop and mobile

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `khayyam-chrome-extension` folder
6. The extension will now replace your new tab page

### From Chrome Web Store

*Coming soon*

## Project Structure

```
khayyam-chrome-extension/
├── manifest.json          # Chrome extension manifest (V3)
├── newtab.html            # New tab page HTML
├── newtab.js              # New tab page logic
├── styles.css             # Styles with dark/light themes
├── khayyam.yaml           # Original YAML data (106 quatrains)
├── khayyam.json           # JSON format for browser use
├── audio/                 # Audio files (Q001.ogg - Q106.ogg)
│   ├── Q001.ogg
│   ├── Q002.ogg
│   └── ...
├── index.js               # Original Node.js module
├── package.json           # npm package metadata
└── README.md
```

## Usage

- **New Tab**: Open a new tab to see a random Khayyam quatrain
- **Play Audio**: Click the play button to hear the recitation
- **Navigate**: Use prev/next buttons or arrow keys to browse quatrains
- **Random**: Click "تصادفی" button or press R for a new random quatrain
- **Theme**: Click the sun/moon icon to toggle dark/light theme

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` | Previous quatrain |
| `←` | Next quatrain |
| `Space` / `Enter` | Play/Pause audio |
| `R` | Random quatrain |

## Data Source

The quatrains are sourced from the [khayyamjs](https://github.com/mehdisadeghi/khayyam) npm package by Mehdi Sadeghi, containing 106 of Omar Khayyam's rubaiyat in YAML format.

**Reference**: RUBAIYAT of OMAR KHAYYAM (ISBN: 978-600-90847-3-9), compiled by Mohsen Majid Tajrishi.

## Original Node.js Package

This project was originally an npm package. To use it in Node.js:

```bash
npm install khayyamjs
```

```javascript
const khayyam = require('khayyamjs');
console.log(khayyam[0]); // First quatrain
```

## Credits

- **Poems**: Omar Khayyam Nishapuri (عمر خیام نیشابوری)
- **Data**: Mehdi Sadeghi - [khayyamjs](https://github.com/mehdisadeghi/khayyam)
- **Font**: [Vazirmatn](https://github.com/rastikerdar/vazirmatn) by Saber Rastikerdar

## License

MIT License - See [khayyam.yaml](khayyam.yaml) for poem collection license (CC BY 4.0).
