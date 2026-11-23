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
export const vistaConsultar = async (req, res) => {
    try{
        const {id} = req.query;

        //Muestra solo el form si no hay id 
        if(!id){
            return res.render("get",{
                title: "Consultar",
                producto: null
            });
        }

        //Buscar producto desde modelo
        const [rows] = await ProductModels.selectProductById(id);

        //Si no exite mostramos el id 

        if(rows.length === 0){
            return res.render("get",{
                title: "Consultar",
                producto: null,
                mensaje: "No se encontro ningun producto con ese id"
            });
        }

        res.render("get", {
            title: "Consultar",
            producto: rows[0]
        });
    }
    catch(error){
        console.log("Error consultado producto: ", error)
        res.status(500).json({
            message: "Error interno añl consultar producto"
        });
    }
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
