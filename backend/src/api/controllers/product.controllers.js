import ProductModels from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectAllProducts();
        res.status(200).json({ payload: productos, total: productos.length });
    } catch (error) {
        console.log("Error obteniendo productos:", error);
        res.status(500).json({ message: "Error interno al obtener productos" });
    }
};

export const getActiveProducts = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectActiveProducts();
        res.status(200).json({ payload: productos, total: productos.length });
    } catch (error) {
        console.log("Error obteniendo productos activos:", error);
        res.status(500).json({ message: "Error interno al obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectProductById(req.id);

        if (productos.length === 0) {
            return res.status(404).json({ message: `No existe el producto ${req.id}` });
        }

        res.status(200).json({ payload: productos });
    } catch (error) {
        console.log("Error consultando producto:", error);
        res.status(500).json({ message: "Error interno al consultar producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, categoria, imagen } = req.body;
        const [result] = await ProductModels.insertProduct(
            nombre.trim(),
            Number(precio),
            categoria.trim(),
            imagen.trim()
        );

        res.status(201).json({
            message: "Producto creado correctamente",
            productId: result.insertId
        });
    } catch (error) {
        console.log("Error creando producto:", error);
        res.status(500).json({ message: "Error interno al crear producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectProductById(req.id);

        if (productos.length === 0) {
            return res.status(404).json({ message: `No existe el producto ${req.id}` });
        }

        const { nombre, precio, categoria, imagen, estado } = req.body;
        await ProductModels.updateProduct(
            req.id,
            nombre.trim(),
            Number(precio),
            categoria.trim(),
            imagen.trim(),
            estado === undefined ? productos[0].estado : Number(estado)
        );

        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.log("Error modificando producto:", error);
        res.status(500).json({ message: "Error interno al modificar producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const [productos] = await ProductModels.selectProductById(req.id);

        if (productos.length === 0) {
            return res.status(404).json({ message: `No existe el producto ${req.id}` });
        }

        await ProductModels.deleteProduct(req.id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.log("Error eliminando producto:", error);
        res.status(500).json({ message: "Error interno al eliminar producto" });
    }
};
