// ── ollama.js ────────────────────────────────────────────
// Handles all communication with the Ollama local API.
// ─────────────────────────────────────────────────────────

const Ollama = {

  // Check if Ollama is reachable
  async checkStatus() {
    try {
      const res = await fetch(`${CONFIG.ollamaUrl}/api/tags`, {
        signal: AbortSignal.timeout(2000)
      });
      UI.setOllamaStatus(res.ok);
    } catch {
      UI.setOllamaStatus(false);
    }
  },

  // Build the full prompt with optional language hint
  buildPrompt(mode, code, lang) {
    const langHint = lang ? ` The code is written in ${lang}.` : "";
    return CONFIG.prompts[mode] + langHint + "\n\n" + code;
  },

  // Stream a generation request and render tokens in real time
  async generate(mode, code, lang) {
    const prompt = this.buildPrompt(mode, code, lang);

    const response = await fetch(`${CONFIG.ollamaUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CONFIG.model,
        stream: true,
        prompt
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama returned status ${response.status}`);
    }

    const reader  = response.body.getReader();
    const decoder = new TextDecoder();
    const cursor  = UI.startStreaming();
    let tokenCount = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const raw   = decoder.decode(value);
      const lines = raw.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) {
            UI.appendToken(json.response, cursor);
            tokenCount++;
          }
        } catch (_) {
          // incomplete JSON chunk — skip
        }
      }
    }

    UI.finishStreaming(cursor, tokenCount);
    UI.setOllamaStatus(true);
  }
};
