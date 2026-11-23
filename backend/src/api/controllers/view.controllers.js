/*============================
    Controladores de vistas
============================*/

import ProductModels from "../models/product.models.js";

export const vistaPrincipal = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectAllProducts();

        res.render("index", {
            title: "Principal",
            usuario: req.session.user,
            listaProductos: productos
        });
    } catch (error) {
        console.log("Error obteniendo productos:", error);
        res.status(500).send("Error al cargar el panel de administración");
    }
};

export const vistaConsultar = (req, res) => {
    res.render("get", { title: "Consultar" });
};

export const vistaCrear = (req, res) => {
    res.render("post", { title: "Crear" });
};

export const vistaCrearUser = (req, res) => {
    res.render("createUser", { title: "Crear usuario" });
};

export const vistaModificar = (req, res) => {
    res.render("put", { title: "Modificar" });
};

export const vistaEliminar = (req, res) => {
    res.render("delete", { title: "Eliminar" });
};
