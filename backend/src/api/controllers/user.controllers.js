import UserModels from "../models/user.models.js";

export const createNewUser = async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        const [result] = await UserModels.insertUser(
            nombre.trim(),
            correo.trim().toLowerCase(),
            contrasena
        );

        res.status(201).json({
            message: "Usuario creado correctamente",
            userId: result.insertId
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Ya existe un usuario con ese correo" });
        }

        console.log("Error creando usuario:", error);
        res.status(500).json({ message: "Error interno al crear el usuario" });
    }
};
