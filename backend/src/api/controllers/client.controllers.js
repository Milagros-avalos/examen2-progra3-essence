
/*============================*
*       Vistas del cliente
*============================*/

import ProductModels from "../models/product.models.js";
import CarritoModels from "../models/carrito.models.js";


// Crear un carrito si el cliente todavía no tiene uno
const asegurarCarrito = async (req) => {
    if (!req.session.idCarrito) {
        const [resultado] = await CarritoModels.crearCarrito(
            req.session.nombreCliente
        );

        req.session.idCarrito = resultado.insertId;
    }
};

// Mostrar catálogo
export const vistaCliente = async (req, res) => {
    try {
        if (!req.session.nombreCliente) {
            return res.render("cliente/bienvenida", {
                title: "Bienvenido"
            });
        }

        await asegurarCarrito(req);

        const [productos] = await ProductModels.selectActiveProducts();

        res.render("cliente/index", {
            title: "Productos",
            listaProductos: productos,
            nombreCliente: req.session.nombreCliente
        });

    } catch (error) {
        console.log("Error obteniendo productos para el cliente:", error);
        res.status(500).send("Error al cargar los productos");
    }
};

// Registrar nombre del cliente
export const registrarNombre = async (req, res) => {
    try {
        const nombre = req.body.nombre?.trim();

        if (!nombre) {
            return res.status(400).send("Debés ingresar tu nombre");
        }

        req.session.nombreCliente = nombre;

        await asegurarCarrito(req);

        res.redirect("/cliente");

    } catch (error) {
        console.log("Error al registrar al cliente:", error);
        res.status(500).send("Error al iniciar la compra");
    }
};

// Agregar producto al carrito
export const agregarAlCarrito = async (req, res) => {
    try {
        if (!req.session.nombreCliente || !req.session.idCarrito) {
            return res.redirect("/cliente");
        }

        const productoId = Number(req.body.productoId);

        if (!Number.isInteger(productoId) || productoId <= 0) {
            return res.status(400).send("Identificador de producto inválido");
        }

        const [productos] = await ProductModels.selectProductById(productoId);

        if (productos.length === 0 || Number(productos[0].estado) !== 1) {
            return res.status(404).send("Producto no disponible");
        }

        const producto = productos[0];
        const precio = Number(producto.precio);

        if (!Number.isFinite(precio) || precio < 0) {
            return res.status(400).send("Precio de producto inválido");
        }

        await CarritoModels.agregarProducto(
            req.session.idCarrito,
            producto.id,
            precio
        );

        await CarritoModels.actualizarTotal(req.session.idCarrito);

        res.redirect("/cliente");

    } catch (error) {
        console.log("Error al agregar producto al carrito:", error);
        res.status(500).send("Error al agregar el producto");
    }
};

// Mostrar carrito del cliente
export const vistaCarrito = async (req, res) => {
    try {
        if (!req.session.nombreCliente) {
            return res.redirect("/cliente");
        }

        await asegurarCarrito(req);

        const [items] = await CarritoModels.obtenerItems(
            req.session.idCarrito
        );

        const [datosCarrito] = await CarritoModels.obtenerCarrito(
            req.session.idCarrito
        );

        res.render("cliente/carrito", {
            title: "Mi carrito",
            carrito: items,
            totalCarrito: datosCarrito[0]?.total_carrito ?? 0,
            nombreCliente: req.session.nombreCliente
        });

    } catch (error) {
        console.log("Error al mostrar el carrito:", error);
        res.status(500).send("Error al cargar el carrito");
    }
};
//Confirmamos la compra del cliente modificando el estado en la bbdd

export const confirmarCompra = async (req, res) => {
    try {
        // Verificar que exista una sesión de cliente
        if (!req.session.nombreCliente || !req.session.idCarrito) {
            return res.redirect("/cliente");
        }

        const idCarrito = req.session.idCarrito;

        // Obtener los datos generales del carrito
        const [datosCarrito] = await CarritoModels.obtenerCarrito(idCarrito);

        if (datosCarrito.length === 0) {
            return res.status(404).send("Carrito no encontrado");
        }

        const compra = datosCarrito[0];

        // Verificar que la compra esté pendiente
        if (compra.estado !== "pendiente") {
            return res.status(400).send("Esta compra ya fue confirmada");
        }

        // Obtener los productos del carrito
        const [items] = await CarritoModels.obtenerItems(idCarrito);

        if (items.length === 0) {
            return res.status(400).send("No podés confirmar un carrito vacío");
        }

        // Cambiar el estado en la bbdd
        const [resultado] = await CarritoModels.confirmarCompra(idCarrito);

        if (resultado.affectedRows === 0) {
            return res.status(400).send("No se pudo confirmar la compra");
        }

        // Mostrar la vista de factura
        return res.render("cliente/factura", {
            title: "Factura de compra",
            compra,
            items
        });

    } catch (error) {
        console.log("Error al confirmar la compra:", error);

        if (!res.headersSent) {
            res.status(500).send("Error al generar la factura");
        } else {
            res.destroy(error);
        }
    }
};


