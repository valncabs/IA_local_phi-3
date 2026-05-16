// ── config.js ──────────────────────────────────────────
// Central configuration: model, endpoint, and prompts.
// Edit this file to switch models or customize behavior.
// ───────────────────────────────────────────────────────

const CONFIG = {
  ollamaUrl: "http://localhost:11434",
  model: "phi3",

  prompts: {
    explain: "Responde siempre en español. Explica qué hace este código línea por línea en términos simples:",
    bugs:    "Responde siempre en español. Encuentra bugs, errores o vulnerabilidades en este código y explica cada uno:",
    improve: "Responde siempre en español. Sugiere mejoras concretas para este código en términos de rendimiento, legibilidad y buenas prácticas:"
  },

  modeLabels: {
    explain: "🔍 Explicando...",
    bugs:    "🐛 Buscando bugs...",
    improve: "✨ Mejorando..."
  },

  btnClass: {
    explain: "btn-explain",
    bugs:    "btn-bugs",
    improve: "btn-improve"
  }
};