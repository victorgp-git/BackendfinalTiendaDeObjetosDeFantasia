import User from "../models/user.model.js";

// Obtener todos los usuarios (solo para pruebas o admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const user = await User.findOne({
      where: { email: correo }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Para este proyecto no tienes passwords reales → login simple
    return res.json(user);

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};

// Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Revisar si existe
    const exists = await User.findOne({
      where: { email: correo }
    });

    if (exists) {
      return res.status(400).json({ error: "Correo ya registrado" });
    }

    // Crear nuevo usuario
    const newUser = await User.create({
      name: nombre,
      email: correo,
      password // ⚠ en tu proyecto no estás encriptando → OK por ahora
    });

    res.json({ success: true, user: newUser });

  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ error: "Error registrando usuario" });
  }
};
