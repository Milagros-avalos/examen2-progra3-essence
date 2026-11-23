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


export const crearProducto = async (req, res) => {
    try{
        const{
            nombre,
            precio,
            categoria,
            imagen
        } = req.body;


    //Verificamos que lleguen los datos 
    if (!nombre || !precio || !categoria || !imagen){
        return res.render("post", {
            title: "Crear", 
            error: "Todos los campos son obligatorios"
        }); 
    }

    //Guardamos el producto
    await ProductModels.insertProduct(
        nombre,
        precio,
        categoria,
        imagen
    );

    //redirecciona al panel principal
    res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error creando producto: ", error);

        res.status(500).json({
            message: "Error interno al crear producto"
        });
    }
};




// Vista modificar
export const vistaModificar = (req, res) => {
    res.render("put", {
        title: "Modificar"
    });
};

// Endpoint para modificar un producto
export const modificarProducto = async (req, res) => {
    try {
        const {
            id,
            nombre,
            precio,
            categoria,
            imagen,
            estado
        } = req.body;

        // Verificamos que lleguen todos los datos
        if (
            !id ||
            !nombre ||
            !precio ||
            !categoria ||
            !imagen ||
            !["0", "1"].includes(estado)
        ) {
            return res.render("put", {
                title: "Modificar",
                error: "Todos los campos son obligatorios"
            });
        }

        // Verificamos que exista el producto
        const [productos] = await ProductModels.selectProductById(id);

        if (productos.length === 0) {
            return res.render("put", {
                title: "Modificar",
                error: "No existe un producto con ese ID"
            });
        }

        // Actualizamos el producto
        await ProductModels.updateProduct(
            id,
            nombre,
            precio,
            categoria,
            imagen,
            estado
        );

        // Volvemos al panel principal
        res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error modificando producto: ", error);

        res.status(500).json({
            message: "Error interno al modificar producto"
        });
    }
};

// Vista eliminar
export const vistaEliminar = (req, res) => {
    res.render("delete", {
        title: "Eliminar"
    });
};

// Endpoint para eliminar un producto
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.render("delete", {
                title: "Eliminar",
                error: "El ID del producto es obligatorio"
            });
        }

        const [productos] = await ProductModels.selectProductById(id);

        if (productos.length === 0) {
            return res.render("delete", {
                title: "Eliminar",
                error: "No existe un producto con ese ID"
            });
        }

        await ProductModels.deleteProduct(id);

        res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error eliminando producto: ", error);

        res.status(500).json({
            message: "Error interno al eliminar producto"
        });
    }
};
