const User = require("../models/login");
const bcrypt = require("bcrypt");

// Registro de usuario
exports.register = async (req, res) => {
    const { nombre, correo, pass } = req.body;

    // Verificar si ya existe el correo
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
        return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = new User({
        nombre,
        correo,
        pass: hashedPassword
    });

    await newUser.save();
    res.status(200).json({ message: "Usuario registrado correctamente" });
};

// Login de usuario
exports.login = async (req, res) => {
    const { correo, pass } = req.body;

    const user = await User.findOne({ correo });
    if (!user) {
        return res.status(404).json({ message: "Correo no encontrado" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({ message: "Login exitoso", userId: user._id });
};
