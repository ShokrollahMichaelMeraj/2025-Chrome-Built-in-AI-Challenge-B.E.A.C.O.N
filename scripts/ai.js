async function runGeminiPrompt(promptText) {
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
}