const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000; // Puerto en el que se ejecutará el servidor

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta para manejar la solicitud POST para agregar una persona al archivo personas.json
app.post('/agregarPersona', (req, res) => {
  const nuevaPersona = req.body;

  fs.readFile('personas.json', (err, data) => {
    if (err) {
      console.error('Error al leer personas.json:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    const personas = JSON.parse(data);
    personas.push(nuevaPersona);

    fs.writeFile('personas.json', JSON.stringify({ personas }), err => { // Guardar el objeto completo, incluyendo el arreglo de personas
      if (err) {
        console.error('Error al escribir personas.json:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }

      res.status(200).json({ message: 'Persona agregada exitosamente' }); // Enviar una respuesta JSON
    });
  });
});

app.get('/personas', (req, res) => {
    fs.readFile('personas.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      const personas = JSON.parse(data);
      res.json(personas);
    });
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

