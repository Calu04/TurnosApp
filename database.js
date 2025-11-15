const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./turnos.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS turnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente TEXT NOT NULL,
      clinica TEXT NOT NULL,
      motivo_reasignacion TEXT,
      fecha_modificacion TEXT
    )
  `);

  db.run(`INSERT INTO turnos(paciente, clinica) VALUES 
    ('Juan Pérez', 'Clínica A'),
    ('María López', 'Clínica B'),
    ('Carlos Ruiz', 'Clínica A')`);
});

module.exports = db;
