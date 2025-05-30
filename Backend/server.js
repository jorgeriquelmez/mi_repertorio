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
  const { id } = req.params;
  const actualizacion = req.body;

  if (!actualizacion || !actualizacion.titulo || !actualizacion.artista) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    let canciones = JSON.parse(
      fs.readFileSync(path.resolve("./repertorio.json"), "utf-8")
    );
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id));
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
