importScripts("../scripts/ai.js");

chrome.runtime.onMessage.addListener(async (msg, sender) => {
  if (msg.type === "USER_TASK") {
    const aiResponse = await runGeminiPrompt(msg.text);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "AI_GUIDE", text: aiResponse });
    });
  }
});