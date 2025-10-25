/**
 * B.E.A.C.O.N. Project Setup Script
 * Browser Extension for AI-Centered Online Navigation
 * Creates the folder and file system for the Chrome Extension project.
 */

const fs = require("fs");
const path = require("path");

const structure = {
  "manifest.json": `{
  "manifest_version": 3,
  "name": "B.E.A.C.O.N.",
  "version": "1.0",
  "description": "Browser Extension for AI-Centered Online Navigation: Like a lighthouse for the web, guiding elderly users safely to their online destination.",
  "permissions": ["activeTab", "scripting", "tts", "storage"],
  "host_permissions": ["<all_urls>"],
  "icons": {
    "16": "assets/icon16.png",
    "48": "assets/icon48.png",
    "128": "assets/icon128.png"
  },
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": "assets/icon128.png"
  },
  "background": {
    "service_worker": "background/background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/content.js"],
      "css": ["content/overlay.css"]
    }
  ],
  "ai_service": {
    "allowed_apis": ["prompt", "summarizer"]
  }
}`,
  "README.md": `# B.E.A.C.O.N. (Browser Extension for AI-Centered Online Navigation)

An extension built for the elderly to guide them when they feel lost on the web — just like a lighthouse guiding ships safely to shore.

---

### 🌟 Features
- Uses Chrome's built-in Gemini Nano AI (Prompt API + Summarizer API)
- Voice input and text-to-speech output
- Highlights on-screen elements for easy navigation
- Designed for accessibility and simplicity

---

### 🧠 Tech Stack
- Manifest V3 Chrome Extension
- Gemini Nano (Built-in AI)
- JavaScript / HTML / CSS
- Web Speech API + Chrome TTS
`,

  assets: {
    "icon16.png": "",
    "icon48.png": "",
    "icon128.png": ""
  },

  popup: {
    "popup.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>B.E.A.C.O.N.</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <h1>🗺️ B.E.A.C.O.N.</h1>
  <textarea id="task" placeholder="What would you like to do?"></textarea>
  <div class="controls">
    <button id="speakBtn">🎤 Speak</button>
    <button id="submitBtn">Ask AI</button>
  </div>
  <p id="status"></p>
  <script src="../utils/speech.js"></script>
  <script src="popup.js"></script>
</body>
</html>`,
    "popup.css": `body {
  font-family: sans-serif;
  background: #f9fafc;
  color: #222;
  width: 280px;
  padding: 15px;
}

h1 {
  font-size: 20px;
  text-align: center;
}

textarea {
  width: 100%;
  height: 60px;
  font-size: 14px;
  margin-bottom: 10px;
}

.controls button {
  margin-right: 5px;
  font-size: 14px;
  cursor: pointer;
}`,
    "popup.js": `document.getElementById("submitBtn").addEventListener("click", async () => {
  const task = document.getElementById("task").value;
  chrome.runtime.sendMessage({ type: "USER_TASK", text: task });
  document.getElementById("status").textContent = "Thinking...";
});

document.getElementById("speakBtn").addEventListener("click", () => {
  startSpeechRecognition(result => {
    document.getElementById("task").value = result;
  });
});`
  },

  background: {
    "background.js": `importScripts("../scripts/ai.js");

chrome.runtime.onMessage.addListener(async (msg, sender) => {
  if (msg.type === "USER_TASK") {
    const aiResponse = await runGeminiPrompt(msg.text);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "AI_GUIDE", text: aiResponse });
    });
  }
});`
  },

  content: {
    "content.js": `chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "AI_GUIDE") {
    showOverlay(msg.text);
    speakText(msg.text);
  }
});

function showOverlay(instruction) {
  const overlay = document.createElement("div");
  overlay.id = "ai-overlay";
  overlay.textContent = instruction;
  overlay.className = "overlay-box";
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 8000);
}`,
    "overlay.css": `.overlay-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 0, 0.9);
  color: #000;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 18px;
  font-family: sans-serif;
  box-shadow: 0 0 10px #aaa;
  z-index: 99999;
}`
  },

  scripts: {
    "ai.js": `async function runGeminiPrompt(promptText) {
  try {
    const session = await ai.createTextSession({ model: "gemini-nano" });
    const response = await session.prompt(promptText);
    return response.output || "Sorry, I couldn’t understand that.";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "AI error occurred.";
  }
}

async function summarizeContent(text) {
  try {
    const summary = await ai.summarize(text);
    return summary;
  } catch {
    return "Summary unavailable.";
  }
}`
  },

  utils: {
    "speech.js": `function startSpeechRecognition(callback) {
  const rec = new webkitSpeechRecognition();
  rec.lang = "en-US";
  rec.start();
  rec.onresult = (e) => callback(e.results[0][0].transcript);
}

function speakText(text) {
  chrome.tts.speak(text, { rate: 0.9, pitch: 1.0, voiceName: "Google US English" });
}`
  },

  styles: {
    "theme.css": `body {
  font-family: sans-serif;
  background-color: #fafafa;
  color: #333;
}`
  }
};

// Recursive folder/file creator
function createStructure(base, obj) {
  for (const name in obj) {
    const target = path.join(base, name);
    if (typeof obj[name] === "string") {
      fs.writeFileSync(target, obj[name]);
    } else {
      if (!fs.existsSync(target)) fs.mkdirSync(target);
      createStructure(target, obj[name]);
    }
  }
}

createStructure(process.cwd(), structure);
console.log("✅ B.E.A.C.O.N. folder structure created successfully!");
