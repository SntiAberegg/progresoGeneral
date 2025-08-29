    // ==========================
    // Estado global editable
    // ==========================
    window.estadoGlobal = {
      pct: 30, // <--- Cambia este número antes de hacer commit para actualizar el estado
      text: "Calibrando sistemas..."
    };

    // Elementos DOM
    const circle = document.getElementById("progress-circle");
    const percentageEl = document.getElementById("percentage");
    const messageEl = document.getElementById("status-message");
    const lastUpdateEl = document.getElementById("last-update");

    // Función principal de renderizado
    function render(data, actualizarVariable = true) {
      if (actualizarVariable) {
        estadoGlobal.pct = data.pct;
        estadoGlobal.text = data.text;
      }

      const grados = (data.pct / 100) * 360;
      circle.style.setProperty("--progress", `${grados}deg`);
      percentageEl.textContent = `${data.pct}%`;
      messageEl.textContent = data.text;
      lastUpdateEl.textContent = `Última actualización: ${new Date(data.ts).toLocaleString()}`;
    }

    // ==========================
    // Función global para consola
    // ==========================
    window.actualizarEstado = function(pct = 0, msg = "") {
      estadoGlobal.pct = Math.min(100, Math.max(0, parseInt(pct, 10) || 0));
      estadoGlobal.text = msg || estadoGlobal.text;
      render({
        pct: estadoGlobal.pct,
        text: estadoGlobal.text,
        ts: Date.now()
      }, false);
    };

    // ==========================
    // Input oculto rápido
    // ==========================
    const inputRapido = document.getElementById("input-rapido");
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "p") {
        inputRapido.style.display = inputRapido.style.display === "none" ? "block" : "none";
        if (inputRapido.style.display === "block") inputRapido.focus();
      }
    });

    inputRapido.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = parseInt(inputRapido.value, 10) || 0;
        actualizarEstado(val);
        inputRapido.value = "";
        inputRapido.style.display = "none";
      }
    });

    // ==========================
    // Inicializamos la UI
    // ==========================
    actualizarEstado(estadoGlobal.pct, estadoGlobal.text);