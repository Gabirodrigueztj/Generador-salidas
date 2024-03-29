let personas = [];
let fechaSeleccionada = '';
let hipodromoSeleccionado = '';
const listaPersonas = document.getElementById('listaPersonas');

window.addEventListener('DOMContentLoaded', () => {
  cargarPersonasDesdeJSON();
  mostrarPersonas(); // Mostrar personas al cargar la página
});

function agregarPersona() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  if (nombre === '' || apellido === '') {
    alert('Por favor ingrese nombre y apellido válidos');
    return;
  }

  const nuevaPersona = { nombre, apellido }; // Crear objeto de nueva persona
  const datos = { personas: [nuevaPersona] }; // Crear objeto con la estructura esperada por el servidor

  // Enviar los datos al servidor para agregar la nueva persona al archivo JSON
  fetch('http://localhost:3000/agregarPersona', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos) // Enviar objeto con la estructura correcta
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Aquí podrías realizar alguna acción adicional si lo deseas, como actualizar la lista de personas en la página
    mostrarPersonas(); // Por ejemplo, puedes llamar a esta función para actualizar la lista de personas en la página
  })
  .catch(error => {
    console.error('Error al agregar persona:', error);
    // Manejar el error si es necesario
  });

  // Limpiar los campos de entrada después de agregar la persona
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
}


function cargarPersonasDesdeJSON() {
  fetch('personas.json')
    .then(response => response.json())
    .then(data => {
      personas = data.personas;
      mostrarPersonas(); // Mostrar personas después de cargar desde JSON
    })
    .catch(error => console.error('Error al cargar personas desde personas.json:', error));
}

function mostrarPersonas() {
  listaPersonas.innerHTML = '';
  personas.forEach((persona, index) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'persona_' + index;
    checkbox.value = index;

    const label = document.createElement('label');
    label.htmlFor = 'persona_' + index;
    label.textContent = `${persona.nombre} ${persona.apellido}`;
    label.classList.add('persona-nombre'); // Agrega la clase persona-nombre al label

    const divPersona = document.createElement('div');
    divPersona.classList.add('persona'); // Agrega la clase persona al div contenedor
    divPersona.appendChild(checkbox);
    divPersona.appendChild(label);

    listaPersonas.appendChild(divPersona); // Agrega el div contenedor al contenedor principal de personas
    listaPersonas.appendChild(document.createElement('br'));
  });
}



// Función para obtener el hipódromo seleccionado
function obtenerHipodromoSeleccionado() {
  hipodromoSeleccionado = document.getElementById('hipodromo').value;
}

function calcularDistribucion() {
  obtenerFechaSeleccionada(); // Obtener la fecha seleccionada
  obtenerHipodromoSeleccionado(); // Obtener el hipódromo seleccionado antes de calcular la distribución
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

    // Agregar el hipódromo seleccionado como título del día en el resultado
    const resultado = `<h2 class="text-center mt-4">${hipodromoSeleccionado} - ${fechaSeleccionada}</h2>` + 
    asignaciones.map((asignacion, index) => {
      return `<h3>Carrera ${index + 1}:</h3>` +
             `<ul>${asignacion.map(persona => `<li>${persona.nombre ? persona.nombre + ' ' + persona.apellido : persona}</li>`).join('')}</ul>`;
    }).join('');



  document.getElementById('resultado').innerHTML = resultado;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function seleccionarTodos() {
  document.querySelectorAll('#listaPersonas input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = true;
  });
}

function deseleccionarTodos() {
  document.querySelectorAll('#listaPersonas input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
  });
}


// Agregar una variable global para almacenar la fecha seleccionada


// Función para obtener la fecha seleccionada
function obtenerFechaSeleccionada() {
  fechaSeleccionada = document.getElementById('fecha').value;
}
