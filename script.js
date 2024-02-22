let personas = [];

function agregarPersona() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  if (nombre === '' || apellido === '') {
    alert('Por favor ingrese nombre y apellido válidos');
    return;
  }

  personas.push({ nombre, apellido });
  mostrarPersonas();
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
}

function mostrarPersonas() {
  const listaPersonas = document.getElementById('listaPersonas');
  listaPersonas.innerHTML = '';
  personas.forEach((persona, index) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'persona_' + index;
    checkbox.value = index;
    const label = document.createElement('label');
    label.htmlFor = 'persona_' + index;
    label.textContent = `${persona.nombre} ${persona.apellido}`;
    listaPersonas.appendChild(checkbox);
    listaPersonas.appendChild(label);
    listaPersonas.appendChild(document.createElement('br'));
  });
}

function calcularDistribucion() {
  const numCarreras = parseInt(document.getElementById('numCarreras').value);

  if (isNaN(numCarreras)) {
    alert('Por favor ingrese un número válido para el número de carreras');
    return;
  }

  const personasSeleccionadas = [];
  document.querySelectorAll('#listaPersonas input[type="checkbox"]:checked').forEach(checkbox => {
    const index = parseInt(checkbox.value);
    personasSeleccionadas.push(personas[index]);
  });

  const personasPorCarrera = Math.ceil(personasSeleccionadas.length / numCarreras);

  const asignaciones = [];
  for (let i = 0; i < numCarreras; i++) {
    asignaciones.push([]);
  }

  for (let i = 0; i < personasSeleccionadas.length; i++) {
    const carreraIndex = i % numCarreras;
    asignaciones[carreraIndex].push(personasSeleccionadas[i]);
  }

  const resultado = asignaciones.map((asignacion, index) => {
    return `<h3>Carrera ${index + 1}:</h3>` +
           `<ul>${asignacion.map(persona => `<li>${persona.nombre} ${persona.apellido}</li>`).join('')}</ul>`;
  }).join('');

  document.getElementById('resultado').innerHTML = resultado;
}
