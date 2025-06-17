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
document.getElementById("tipo").addEventListener("change", actualizarSubtipos);

function actualizarSubtipos() {
  const tipo = document.getElementById("tipo").value;
  const contenedor = document.getElementById("subtipo-container");

  let opcionesHTML = `<label for="subtipo">Tipo específico:</label><select id="subtipo">`;

  if (tipo === "fusion") {
    opcionesHTML += `
      <option value="fusion">Fusión (sólido → líquido)</option>
      <option value="solidificacion">Solidificación (líquido → sólido)</option>
    `;
  } else if (tipo === "vaporizacion") {
    opcionesHTML += `
      <option value="evaporacion">Evaporación (líquido → gas)</option>
      <option value="condensacion">Condensación (gas → líquido)</option>
    `;
  }

  opcionesHTML += `</select>`;
  contenedor.innerHTML = opcionesHTML;
}

// Ejecutar al cargar para mostrar el subtipo correcto desde el inicio
actualizarSubtipos();

function calcular() {
  const subtipo = document.getElementById("subtipo")?.value;
  const nombre = document.getElementById("sustancia").value;
  const masa = parseFloat(document.getElementById("masa").value);
  const tipo = document.getElementById("tipo").value;
 let direccion = "";
 if (subtipo === "fusion" || subtipo === "evaporacion") {
   direccion = "absorber";
 } else if (subtipo === "solidificacion" || subtipo === "condensacion") {
   direccion = "liberar";
 }
  const datos = sustancias[nombre];
  const L = tipo === "fusion" ? datos.fusion : datos.vaporizacion;

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.className = "";

  if (!L || isNaN(masa)) {
    resultadoDiv.textContent = "Por favor ingresa todos los datos correctamente.";
    resultadoDiv.style.display = "block";
    return;
  }

  // Calcula calor
  let Q = masa * L;
  if (direccion === "liberar") {
    Q *= -1; // cambia signo si está liberando calor
  }
    resultadoDiv.textContent = `Durante la ${subtipo}, el calor ${direccion === "absorber" ? "absorbido" : "liberado"} fue de ${Q.toLocaleString()} J.`;

  if (subtipo) resultadoDiv.classList.add(subtipo);

  // Reiniciar animación
  resultadoDiv.style.animation = "none";
  resultadoDiv.offsetHeight;
  resultadoDiv.style.animation = null;
  resultadoDiv.style.display = "block";
}