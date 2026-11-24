
import connection from "../database/db.js";

// Crear un carrito nuevo
const crearCarrito = (nombreCliente) => {
    const sql = `
        INSERT INTO carrito (nombre_cliente, total_carrito)
        VALUES (?, 0)
    `;

    return connection.query(sql, [nombreCliente]);
};

// Agregar un producto o aumentar su cantidad si ya existe
const agregarProducto = (idCarrito, idProducto, precio) => {
    const sql = `
        INSERT INTO carrito_items
            (id_carrito, id_producto, cantidad, precio_total_producto)
        VALUES (?, ?, 1, ?)
        ON DUPLICATE KEY UPDATE
            cantidad = cantidad + 1,
            precio_total_producto = precio_total_producto + ?
    `;

    return connection.query(sql, [
        idCarrito,
        idProducto,
        precio,
        precio
    ]);
};

// Actualizar el total general del carrito
const actualizarTotal = (idCarrito) => {
    const sql = `
        UPDATE carrito
        SET total_carrito = (
            SELECT COALESCE(SUM(precio_total_producto), 0)
            FROM carrito_items
            WHERE id_carrito = ?
        )
        WHERE id = ?
    `;

    return connection.query(sql, [idCarrito, idCarrito]);
};

// Obtener los productos del carrito
const obtenerItems = (idCarrito) => {
    const sql = `
        SELECT
            ci.id_producto,
            p.nombre,
            p.imagen,
            ci.cantidad,
            ci.precio_total_producto
        FROM carrito_items ci
        INNER JOIN productos p ON ci.id_producto = p.id
        WHERE ci.id_carrito = ?
    `;

    return connection.query(sql, [idCarrito]);
};

// Obtener los datos generales del carrito
const obtenerCarrito = (idCarrito) => {
    const sql = `
        SELECT *
        FROM carrito
        WHERE id = ?
    `;

    return connection.query(sql, [idCarrito]);
};
// Confirmar una compra pendiente
const confirmarCompra = (idCarrito) => {
    const sql = `
        UPDATE carrito
        SET estado = 'confirmada'
        WHERE id = ?
        AND estado = 'pendiente'
    `;

    return connection.query(sql, [idCarrito]);
};

const CarritoModels = {
    crearCarrito,
    agregarProducto,
    actualizarTotal,
    obtenerItems,
    obtenerCarrito,
    confirmarCompra
};

export default CarritoModels;
