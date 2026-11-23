import express from "express";//Express es una librería de Node.js que te permite crear un servidor web de forma simple
import session from "express-session";
import { fileURLToPath } from "node:url";
import environments from "./src/api/config/environments.js";
import { authRoutes, viewRoutes } from "./src/api/routes/index.js";
import clientRoutes from "./src/api/routes/client.routes.js";

const { port, session_key } = environments;
const app = express();

app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./src/views/", import.meta.url)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(fileURLToPath(new URL("./src/public/", import.meta.url))));

// Middleware de sesion
app.use(session({
    secret: session_key,
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // Configuracion utilizada en la guia del profesor
}));

app.get("/", (req, res) => {
    res.redirect("/login");
});

// Vista pública del cliente
app.use("/cliente", clientRoutes);

// Redirijo las peticiones del dashboard al modulo de rutas de vistas
app.use("/dashboard", viewRoutes);

// Rutas de autenticacion
app.use("/", authRoutes);
app.listen(port, () => console.log(`Essence en http://localhost:${port}`));
