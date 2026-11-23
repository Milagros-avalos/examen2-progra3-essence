/*===========================
    Rutas de autenticacion
===========================*/

import { Router } from "express";
import connection from "../database/db.js";

const router = Router();

// Vista del login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login usuario",
        about: "Login de usuario admin"
    });
});

// Endpoint para loguear a un usuario admin
router.post("/login", async (req, res) => {
    try {
        // Extraemos los datos que vienen en el cuerpo de la peticion POST
        const { email, password } = req.body;

        // Verificamos que vengan todos los datos
        if (!email || !password) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Todos los campos son requeridos"
            });
        }

        // Buscamos el usuario usando la tabla y las columnas de Essence.
        const sql = "SELECT * FROM `user` WHERE correo = ? AND `contraseña` = ?";

        const [rows] = await connection.query(sql, [email, password]);

        // Verificamos que exista el usuario
        if (rows.length === 0) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];

        // Guardamos el usuario en la sesion
        req.session.user = {
            id: user.id,
            name: user.nombre,
            email: user.correo
        };

        // Redirigimos al dashboard
        res.redirect("/dashboard/principal");
    } catch (error) {
        console.log("Error en el login: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

// Endpoint para destruir la sesion
router.post("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log("Error al destruir la sesion: ", error);
            return res.status(500).json({
                message: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
});

// Exportamos las rutas
export default router;
