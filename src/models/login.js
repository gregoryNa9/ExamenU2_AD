const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombre: String,
    correo: { type: String, unique: true },
    pass: String
});

module.exports = mongoose.model("User", userSchema);
