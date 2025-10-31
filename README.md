# B.E.A.C.O.N. (Browser Extension for AI-Centered Online Navigation)

An extension built for the elderly to guide them when they feel lost on the web , just like a lighthouse guiding ships safely to shore.

---
## Features

- ✅ Uses Chrome's built-in Gemini Nano AI (Prompt API)
- 🎤 Voice input and text-to-speech output (coming soon)
- 🟢 Highlights on-screen elements for easy navigation (coming soon)
- ♿ Designed for accessibility and simplicity
- 🔒 Privacy-first: All AI processing happens on your device


## Tech Stack

Manifest V3 Chrome Extension
Gemini Nano (Built-in Chrome AI)
JavaScript / HTML / CSS
Web Speech API (for voice features)
Chrome TTS (for audio guidance)


## Project Structure
```
 
BEACON/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI
├── popup.js              # Popup logic & AI integration
├── styles.css            # Elderly-friendly styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── content-script.js     # (Coming soon) Page manipulation
├── background.js         # (Coming soon) Service worker
├── README.md
├── .gitignore
└── LICENSE
```

## Setup Instructions
Prerequisites

Chrome Dev or Canary (required for Prompt API)

Download: Chrome Canary
Download: Chrome Dev


Enable Prompt API

Go to chrome://flags
Search for "Prompt API for Gemini Nano"
Set to Enabled
Search for "Enables optimization guide on device"
Set to Enabled
Restart Chrome


Download AI Model

Go to chrome://components/
Find "Optimization Guide On Device Model"
Click "Check for update"
Wait for download (may take several minutes)



Installation

Clone the repository

bash   git clone https://github.com/YOUR_USERNAME/beacon-extension.git
   cd beacon-extension

Load the extension

Open Chrome and go to chrome://extensions/
Enable "Developer mode" (toggle in top right)
Click "Load unpacked"
Select the beacon-extension folder


Test it

Click the B.E.A.C.O.N. icon in your toolbar
Try asking: "How do I send an email?"
The AI should provide guidance!




🧪 Testing Feature 1.1 & 1.2
What to test:

✅ Extension loads without errors
✅ Popup opens with clean UI
✅ Status message shows "B.E.A.C.O.N. is ready to help!"
✅ Can type a question and get AI response
✅ Response appears with proper formatting
✅ "Start Over" button clears the response

Test questions to try:

"How do I send an email?"
"Where do I click to see my notifications?"
"How do I change my password?"


🗺️ Development Roadmap
✅ Phase 1: Foundation (Current)

 Feature 1.1: Basic extension structure
 Feature 1.2: Prompt API integration
 Feature 1.3: Voice input (Web Speech API)

📋 Phase 2: Screen Analysis

 Feature 2.1: DOM inspection
 Feature 2.2: AI task interpretation
 Feature 2.3: Element identification

🎨 Phase 3: Visual Guidance

 Feature 3.1: Element highlighting
 Feature 3.2: Step-by-step flow
 Feature 3.3: Text-to-speech feedback

🚀 Phase 4: Polish

 Real user testing
 Error handling improvements
 Accessibility enhancements
 Chrome Web Store submission


🤝 Contributing
This is a hackathon project! Development is happening in phases.

📝 License
MIT License (or your choice)

🙏 Acknowledgments
Built for the Chrome Built-in AI Challenge 2024
Powered by Chrome's Prompt API and Gemini Nano