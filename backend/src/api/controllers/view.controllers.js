/*============================
    Controladores vistas
============================*/

import ProductModels from "../models/product.models.js";

// Vista principal
export const vistaPrincipal = async (req, res) => {
    try {
        // Le pedimos al modelo todos los productos de Essence
        const [rows] = await ProductModels.selectAllProducts();

        res.render("index", {
            title: "Principal",
            usuario: req.session.user,
            listaProductos: rows
        });
    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
};

// Vista consultar
export const vistaConsultar = (req, res) => {
    res.render("get", {
        title: "Consultar"
    });
};

// Vista crear
export const vistaCrear = (req, res) => {
    res.render("post", {
        title: "Crear"
    });
};

// Vista modificar
export const vistaModificar = (req, res) => {
    res.render("put", {
        title: "Modificar"
    });
};

// Vista eliminar
export const vistaEliminar = (req, res) => {
    res.render("delete", {
        title: "Eliminar"
    });
};
