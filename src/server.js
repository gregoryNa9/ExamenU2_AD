const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tareas", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(8080, () => console.log("Servidor corriendo en http://localhost:8080"));
