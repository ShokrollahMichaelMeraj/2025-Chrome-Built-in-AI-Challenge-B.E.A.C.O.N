# B.E.A.C.O.N. (Browser Extension for AI-Centered Online Navigation)

An extension built for the elderly to guide them when they feel lost on the web , just like a lighthouse guiding ships safely to shore.

---

### Features

- Uses Chrome's built-in Gemini Nano AI (Prompt API + Summarizer API)
- Voice input and text-to-speech output
- Highlights on-screen elements for easy navigation
- Designed for accessibility and simplicity

---

### Tech Stack
- Manifest V3 Chrome Extension
- Gemini Nano (Built-in AI)
- JavaScript / HTML / CSS
- Web Speech API + Chrome TTS

```

BEACON
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── content-script.js (we'll add this later)
├── background.js (we'll add this later)
├── README.md
├── .gitignore
└── LICENSE (optional)
```

## What to include in your repo:

**Essential files:**
- All extension code (manifest, HTML, JS, CSS)
- Icons (if you don't have them yet, we can use placeholder colors)
- README.md with setup instructions
- .gitignore

**README.md should include:**
- Project description
- Features list
- Setup instructions (how to load extension)
- How to enable Prompt API
- Development roadmap
