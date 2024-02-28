const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

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

    fs.writeFile('personas.json', JSON.stringify({ personas }), err => {
      if (err) {
        console.error('Error al escribir personas.json:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }

      res.status(200).json({ message: 'Persona agregada exitosamente' });
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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
