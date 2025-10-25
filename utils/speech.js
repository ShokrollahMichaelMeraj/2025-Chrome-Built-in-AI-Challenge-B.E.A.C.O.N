function startSpeechRecognition(callback) {
  const rec = new webkitSpeechRecognition();
  rec.lang = "en-US";
  rec.start();
  rec.onresult = (e) => callback(e.results[0][0].transcript);
}

function speakText(text) {
  chrome.tts.speak(text, { rate: 0.9, pitch: 1.0, voiceName: "Google US English" });
}