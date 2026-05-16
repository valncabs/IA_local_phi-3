# 🧠 Code Analyzer AI

**Problema:** Los developers junior pierden horas entendiendo código ajeno o buscando bugs en Stack Overflow.

**Resuelve:** Comprensión inmediata sin salir del entorno, sin depender de internet ni de pagar ChatGPT. Todo corre localmente en tu máquina con IA privada.

---

## 📁 Estructura del proyecto

```
code-analyzer/
├── index.html        ← Estructura principal (HTML)
├── css/
│   └── styles.css    ← Estilos y tema oscuro
├── js/
│   ├── config.js     ← Configuración central (modelo, prompts)
│   ├── ui.js         ← Manipulación del DOM y estado visual
│   ├── ollama.js     ← Comunicación con la API de Ollama
│   └── app.js        ← Punto de entrada, eventos globales
└── README.md
```

---

## ⚙️ Instalación paso a paso

### Paso 1 — Instalar Ollama

Ollama es el motor que corre la IA localmente en tu PC.

**Windows** (PowerShell como administrador):
```powershell
irm https://ollama.com/install.ps1 | iex
```

**Linux**:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

O descárgalo manualmente desde: https://ollama.com

---

### Paso 2 — Descargar el modelo Phi-3

Abre una terminal y ejecuta:

```bash
ollama pull phi3
```

>  El modelo pesa aproximadamente **2.3 GB**. Espera a que la descarga termine completamente antes de continuar.

---

### Paso 3 — Levantar Ollama con CORS habilitado

La app corre en el navegador y necesita comunicarse con Ollama. Para que esto funcione debes habilitar CORS:

**Windows (CMD)**:
```cmd
set OLLAMA_ORIGINS=* && ollama serve
```

**Windows (PowerShell)**:
```powershell
$env:OLLAMA_ORIGINS="*"; ollama serve
```

**Mac / Linux**:
```bash
OLLAMA_ORIGINS=* ollama serve
```

>  Deja esta terminal **abierta** mientras usas la app. No la cierres.

---

### Paso 4 — Verificar que Ollama está corriendo

Abre tu navegador y visita:

```
http://localhost:11434
```

Debes ver el mensaje:

```
Ollama is running 
```

---

### Paso 5 — Abrir la app

1. Descarga o clona este repositorio en tu PC
2. Abre el archivo `index.html` directamente en el navegador (doble clic)
3. En la barra inferior verás el indicador de estado de Ollama:
   - 🟢 Verde = conectado y listo
   - 🔴 Rojo = Ollama no está corriendo

> No necesitas instalar Node.js, npm ni ningún otro framework. Es HTML puro.

---

### Paso 6 — Probar la app

Pega este código en el panel izquierdo:

```python
def dividir(a, b):
    return a / b
```

Haz clic en **🐛 Find Bugs** — la IA debería detectar que falta manejar la división por cero.

---

## 🔧 Configuración

Si quieres cambiar el modelo o los prompts, edita el archivo `js/config.js`:

```js
const CONFIG = {
  model: "phi3",        // ← cambia el modelo aquí (ej: "llama3", "mistral")
  ollamaUrl: "http://localhost:11434",

  prompts: {
    explain: "Responde siempre en español. Explica qué hace este código línea por línea en términos simples:",
    bugs:    "Responde siempre en español. Encuentra bugs, errores o vulnerabilidades en este código y explica cada uno:",
    improve: "Responde siempre en español. Sugiere mejoras concretas para este código en términos de rendimiento, legibilidad y buenas prácticas:"
  }
};
```

---

## ❓ Solución de problemas

| Problema | Solución |
|---|---|
| La app dice "Ollama: offline" | Ejecuta `OLLAMA_ORIGINS=* ollama serve` y recarga la página |
| Error de CORS en consola | Asegúrate de incluir `OLLAMA_ORIGINS=*` al levantar Ollama |
| La respuesta tarda mucho | Normal en CPU — Phi-3 puede tardar 10-30 seg dependiendo del código |
| No descarga el modelo | Verifica tu conexión a internet y corre `ollama pull phi3` de nuevo |

---

## 📋 Requisitos mínimos

| Componente | Mínimo recomendado |
|---|---|
| RAM | 8 GB (16 GB recomendado) |
| Almacenamiento | 3 GB libres |
| OS | Windows 10+, macOS 12+, Ubuntu 20.04+ |
| Navegador | Chrome, Firefox, Edge (versiones modernas) |

---

## 🚀 Modelos alternativos

Si quieres probar otros modelos, solo cambia `model` en `config.js` y descárgalo:

```bash
ollama pull llama3       # Meta LLaMA 3 (más potente, más pesado)
ollama pull mistral      # Mistral 7B (buen balance)
ollama pull codellama    # Especializado en código
```
