/*===========================
    Modelo de productos
===========================*/

import connection from "../database/db.js";

// Obtiene todos los productos de la base de datos
const selectAllProducts = () => {
    const sql = "SELECT * FROM productos";

    return connection.query(sql);
};

// Obtiene un producto por id (para buscar)
const selectProductById = (id) => {
    const sql = "SELECT * FROM productos WHERE id= ?"; 
    
    return connection.query(sql, [id]);
}

const ProductModels = {
    selectAllProducts,
    selectProductById
};

export default ProductModels;
