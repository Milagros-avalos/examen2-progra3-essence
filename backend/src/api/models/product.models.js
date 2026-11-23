/*===========================
    Modelo de productos
===========================*/

import connection from "../database/db.js";

// Obtiene todos los productos de la base de datos
const selectAllProducts = () => {
    const sql = "SELECT * FROM productos";

    return connection.query(sql);
};

const ProductModels = {
    selectAllProducts
};

export default ProductModels;
