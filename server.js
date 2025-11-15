const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// GET turnos
app.get("/turnos", (req, res) => {
  db.all("SELECT * FROM turnos", (err, rows) => {
    res.json(rows);
  });
});

// PUT reasignación
app.put("/reasignar/:id", (req, res) => {
  const { id } = req.params;
  const { nuevaClinica, motivo } = req.body;

  const fecha = new Date().toISOString();

  db.run(
    `UPDATE turnos 
     SET clinica = ?, motivo_reasignacion = ?, fecha_modificacion = ?
     WHERE id = ?`,
    [nuevaClinica, motivo, fecha, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: "Turno reasignado correctamente" });
    }
  );
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
