// ── ui.js ───────────────────────────────────────────────
// All DOM manipulation and UI state helpers.
// ────────────────────────────────────────────────────────

const UI = {

  // Elements
  output:      () => document.getElementById("output"),
  outputLabel: () => document.getElementById("outputLabel"),
  tokenCount:  () => document.getElementById("tokenCount"),
  charCount:   () => document.getElementById("charCount"),
  codeInput:   () => document.getElementById("codeInput"),
  langSelect:  () => document.getElementById("langSelect"),
  modeStatus:  () => document.getElementById("modeStatus"),
  ollamaStatus:() => document.getElementById("ollamaStatus"),
  ollamaLabel: () => document.getElementById("ollamaLabel"),

  // Show loading spinner
  showSpinner(label = "connecting to phi3...") {
    this.output().innerHTML = `
      <div class="spinner-wrap">
        <div class="spinner"></div>
        <div class="spinner-label">${label}</div>
      </div>`;
  },

  // Show empty placeholder
  showPlaceholder() {
    this.output().innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">⬡</div>
        <div class="placeholder-text">Paste code and choose an action</div>
      </div>`;
  },

  // Show error message
  showError(msg) {
    this.output().innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">⚠</div>
        <div class="placeholder-text">${msg}</div>
      </div>`;
  },

  // Clear output and append a blinking cursor, return cursor element
  startStreaming() {
    this.output().textContent = "";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    this.output().appendChild(cursor);
    return cursor;
  },

  // Append a token to the output keeping cursor at the end
  appendToken(text, cursor) {
    const out = this.output();
    // Insert text before cursor
    out.insertBefore(document.createTextNode(text), cursor);
    out.scrollTop = out.scrollHeight;
  },

  // Finish streaming: remove cursor, update labels
  finishStreaming(cursor, tokenCount) {
    cursor.remove();
    this.outputLabel().textContent = "Output";
    this.tokenCount().textContent = tokenCount + " tokens";
  },

  // Set active button and mode labels
  setActiveMode(mode) {
    document.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
    document.querySelector("." + CONFIG.btnClass[mode])?.classList.add("active");
    this.outputLabel().textContent = CONFIG.modeLabels[mode];
    this.modeStatus().textContent  = mode.toUpperCase();
    this.tokenCount().textContent  = "";
  },

  // Reset everything to initial state
  reset() {
    this.codeInput().value          = "";
    this.charCount().textContent    = "0 chars";
    this.tokenCount().textContent   = "";
    this.outputLabel().textContent  = "Output";
    this.modeStatus().textContent   = "";
    document.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
    this.showPlaceholder();
  },

  // Update Ollama status indicator
  setOllamaStatus(online) {
    this.ollamaStatus().className = "status-dot " + (online ? "online" : "error");
    this.ollamaLabel().textContent = "Ollama: " + (online ? "connected" : "offline");
  },

  // Update char counter
  updateCharCount(value) {
    this.charCount().textContent = value.length + " chars";
  }
};
