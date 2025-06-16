const sustancias = {
  agua: { fusion: 334000, vaporizacion: 2256000 },
  aluminio: { fusion: 358000, vaporizacion: 9220000 },
  cobre: { fusion: 134000, vaporizacion: 5069000 },
  etanol: { fusion: 104200, vaporizacion: 854000 },
  hielo: { fusion: 334000, vaporizacion: null },
  hierro: { fusion: 293000, vaporizacion: 6300000 },
  plomo: { fusion: 24300, vaporizacion: 871000 },
  mercurio: { fusion: 11800, vaporizacion: 272000 },
  plata: { fusion: 88300, vaporizacion: 2336000 },
  vapor: { fusion: null, vaporizacion: 2256000 }
};

function calcular() {
  const nombre = document.getElementById("sustancia").value;
  const masa = parseFloat(document.getElementById("masa").value);
  const tipo = document.getElementById("tipo").value;
  const direccion = document.getElementById("direccion").value;

  const datos = sustancias[nombre];
  const L = tipo === "fusion" ? datos.fusion : datos.vaporizacion;

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.className = "";

  if (!L) {
    resultadoDiv.textContent = "No hay datos disponibles para este cambio de fase.";
    resultadoDiv.style.display = "block";
    return;
  }

  // Calcula calor
  let Q = masa * L;
  if (direccion === "liberar") {
    Q *= -1; // cambia signo si está liberando calor
  }

  resultadoDiv.textContent = `Calor ${direccion === "absorber" ? "absorbido" : "liberado"}: ${Q.toLocaleString()} J`;
  resultadoDiv.classList.add(tipo);

  // Reiniciar animación
  resultadoDiv.style.animation = "none";
  resultadoDiv.offsetHeight;
  resultadoDiv.style.animation = null;
  resultadoDiv.style.display = "block";
}