document.getElementById("submitBtn").addEventListener("click", async () => {
  const task = document.getElementById("task").value;
  chrome.runtime.sendMessage({ type: "USER_TASK", text: task });
  document.getElementById("status").textContent = "Thinking...";
});

document.getElementById("speakBtn").addEventListener("click", () => {
  startSpeechRecognition(result => {
    document.getElementById("task").value = result;
  });
});