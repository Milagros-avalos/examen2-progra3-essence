import connection from "../database/db.js";

const insertUser = (nombre, correo, contrasena) => {
    const sql = "INSERT INTO `user` (nombre, correo, `contraseña`) VALUES (?, ?, ?)";
    return connection.query(sql, [nombre, correo, contrasena]);
};

const UserModels = { insertUser };

export default UserModels;
