import express from "express";
import fs from "fs";
import path from "path";
import "dotenv/config";

const app = express();
app.use(express.json()); //para recibir datos en formato JSON
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../Frontend/index.html"));
});
app.get("/canciones", (req, res) => {
  try {
    const canciones = JSON.parse(
      fs.readFileSync(path.resolve("./repertorio.json"), "utf-8")
    );
    res.json(canciones);
  } catch (error) {
    console.error("Error al leer el archivo canciones.json:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.post("/canciones", (req, res) => {
  const nuevaCancion = req.body;
  if (!nuevaCancion || !nuevaCancion.titulo || !nuevaCancion.artista) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const canciones = JSON.parse(
      fs.readFileSync(path.resolve("./repertorio.json"), "utf-8")
    );
    canciones.push(nuevaCancion);
    fs.writeFileSync(
      path.resolve("./repertorio.json"),
      JSON.stringify(canciones, null, 2)
    );
    res.status(201).json(nuevaCancion);
  } catch (error) {
    console.error("Error al guardar la cancion:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  try {
    let canciones = JSON.parse(
      fs.readFileSync(path.resolve("./repertorio.json"), "utf-8")
    );
    canciones = canciones.filter((cancion) => cancion.id !== parseInt(id));
    fs.writeFileSync(
      path.resolve("./repertorio.json"),
      JSON.stringify(canciones, null, 2)
    );
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la cancion:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params; // ID de la URL (string)
  let actualizacion = req.body; // Datos de actualización del frontend
  //logica para asegurarse de que el ID es un número
  if (actualizacion.id !== undefined) {
    actualizacion.id = parseInt(actualizacion.id);
    if (isNaN(actualizacion.id)) {
      return res
        .status(400)
        .json({ error: "ID de canción en el cuerpo de solicitud inválido" });
    }
  }
  // Verificar que los campos requeridos estén presentes

  if (!actualizacion || !actualizacion.titulo || !actualizacion.artista) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const idNumerico = parseInt(id);
    if (isNaN(idNumerico)) {
      return res.status(400).json({ error: "ID de canción en URL inválido" });
    }

    let canciones = JSON.parse(
      fs.readFileSync(path.resolve("./repertorio.json"), "utf-8")
    );

    // Tu findIndex ya usa parseInt, lo cual es correcto
    const index = canciones.findIndex(
      (cancion) => parseInt(cancion.id) === idNumerico
    );

    if (index === -1) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    canciones[index] = { ...canciones[index], ...actualizacion };

    fs.writeFileSync(
      path.resolve("./repertorio.json"),
      JSON.stringify(canciones, null, 2)
    );
    res.json(canciones[index]);
  } catch (error) {
    console.error("Error al actualizar la cancion:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.listen(
  PORT,
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
);
