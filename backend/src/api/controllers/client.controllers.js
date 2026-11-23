/*============================
    Vistas del cliente
============================*/

import ProductModels from "../models/product.models.js";

export const vistaCliente = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectActiveProducts();

        res.render("cliente/index", {
            title: "Productos",
            listaProductos: productos
        });
    } catch (error) {
        console.log("Error obteniendo productos para el cliente:", error);

        res.status(500).send("Error al cargar los productos");
    }
};
