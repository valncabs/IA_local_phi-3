// ── app.js ───────────────────────────────────────────────
// Entry point: wires up events and exposes global actions.
// ─────────────────────────────────────────────────────────

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  Ollama.checkStatus();

  // Live char counter
  UI.codeInput().addEventListener("input", (e) => {
    UI.updateCharCount(e.target.value);
  });
});

// ── Global actions (called from HTML onclick) ─────────────

async function analyze(mode) {
  const code = UI.codeInput().value.trim();
  const lang = UI.langSelect().value;

  if (!code) {
    alert("Please paste some code first.");
    return;
  }

  UI.setActiveMode(mode);
  UI.showSpinner(`asking ${CONFIG.model}...`);

  try {
    await Ollama.generate(mode, code, lang);
  } catch (err) {
    console.error(err);
    UI.showError(
      "Could not connect to Ollama.\n\n" +
      "Make sure it is running:\n" +
      "OLLAMA_ORIGINS=* ollama serve"
    );
    UI.setOllamaStatus(false);
    UI.outputLabel().textContent = "Output";
  }
}

function clearAll() {
  UI.reset();
}
