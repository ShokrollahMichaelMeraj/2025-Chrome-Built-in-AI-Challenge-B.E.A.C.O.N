chrome.runtime.onMessage.addListener((msg) => {
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
}