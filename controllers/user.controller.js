import { db } from "../data/db.js";

export const getAllUsers = (req, res) => {
  res.json(db.users);
};

export const loginUser = (req, res) => {
  const { correo, password } = req.body;

  // buscar usuario por correo
  const user = db.users.find(u => u.correo === correo);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // LOGIN FALSO (no hay passwords en tu db)
  // Para que funcione: si existe, deja entrar
  return res.json(user);
};

export const registerUser = (req, res) => {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const exists = db.users.some(u => u.correo === correo);
  if (exists) {
    return res.status(400).json({ error: "Correo ya registrado" });
  }

  const newUser = {
    id: db.users.length + 1,
    nombre,
    correo,
    activo: true
  };

  db.users.push(newUser);

  res.json({ success: true, user: newUser });
};
