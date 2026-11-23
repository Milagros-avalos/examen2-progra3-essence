/*===========================
    Modelo de productos
===========================*/

import connection from "../database/db.js";

// Obtiene todos los productos de la base de datos
const selectAllProducts = () => {
    const sql = "SELECT * FROM productos";

    return connection.query(sql);
};

// Obtiene únicamente los productos activos para el catálogo del cliente
const selectActiveProducts = () => {
    const sql = "SELECT * FROM productos WHERE estado = 1";

    return connection.query(sql);
};

// Obtiene un producto por id (para buscar)
const selectProductById = (id) => {
    const sql = "SELECT * FROM productos WHERE id= ?"; 
    
    return connection.query(sql, [id]);
}


//Crear un producto nuevo
const insertProduct = (nombre, precio, categoria, imagen) => {
    const sql = `
        INSERT INTO productos (nombre, precio, categoria, imagen)
        VALUES (?, ?, ?, ?)
    `;

    return connection.query(sql, [
        nombre,
        precio,
        categoria,
        imagen
    ]);
};


// Modifica un producto existente
const updateProduct = (id, nombre, precio, categoria, imagen, estado) => {
    const sql = `
        UPDATE productos
        SET nombre = ?,
            precio = ?,
            categoria = ?,
            imagen = ?,
            estado = ?
        WHERE id = ?
    `;

    return connection.query(sql, [
        nombre,
        precio,
        categoria,
        imagen,
        estado,
        id
    ]);
};

// Elimina un producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";

    return connection.query(sql, [id]);
};





const ProductModels = {
    selectAllProducts,
    selectActiveProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
};

export default ProductModels;
