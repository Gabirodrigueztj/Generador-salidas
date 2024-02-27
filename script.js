let personas = [];

// Cargar personas al cargar la página
window.addEventListener('DOMContentLoaded', cargarPersonas);

function agregarPersona() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  if (nombre === '' || apellido === '') {
    alert('Por favor ingrese nombre y apellido válidos');
    return;
  }

  personas.push({ nombre, apellido });
  guardarPersonas(); // Guardar personas en localStorage
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

function guardarPersonas() {
  localStorage.setItem('personas', JSON.stringify(personas));
}

function cargarPersonas() {
  const personasGuardadas = JSON.parse(localStorage.getItem('personas'));
  if (personasGuardadas) {
    personas = personasGuardadas;
    mostrarPersonas();
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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

  shuffle(personasSeleccionadas);

  const personasPorCarrera = Math.ceil(personasSeleccionadas.length / (numCarreras - 4));

  const asignaciones = [];
  for (let i = 0; i < numCarreras; i++) {
    asignaciones.push([]);
  }

  let indexPersona = 0;
  for (let i = 0; i < numCarreras; i++) {
    if (i < 2 || i >= numCarreras - 2) {
      asignaciones[i] = ['Carrera no asignada'];
    } else {
      for (let j = 0; j < personasPorCarrera; j++) {
        if (indexPersona < personasSeleccionadas.length) {
          asignaciones[i].push(personasSeleccionadas[indexPersona]);
          indexPersona++;
        }
      }
    }
  }

  const resultado = asignaciones.map((asignacion, index) => {
    return `<h3>Carrera ${index + 1}:</h3>` +
           `<ul>${asignacion.map(persona => `<li>${persona.nombre ? persona.nombre + ' ' + persona.apellido : persona}</li>`).join('')}</ul>`;
  }).join('');

  document.getElementById('resultado').innerHTML = resultado;
}
