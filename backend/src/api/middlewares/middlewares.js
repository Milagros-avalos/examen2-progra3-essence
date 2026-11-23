// Registra en consola cada solicitud recibida.
export const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleString("es-AR")}] ${req.method} ${req.originalUrl}`);
    next();
};

// Protege las vistas del administrador.
export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

// Protege los endpoints de API y responde en JSON si no hay sesión.
export const requireLoginApi = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Debes iniciar sesión" });
    }
    next();
};

// Valida los IDs recibidos en rutas como /api/products/:id.
export const validateId = (req, res, next) => {
    const id = Number(req.params.id ?? req.body.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un número entero positivo"
        });
    }

    req.id = id;
    next();
};

// Valida los campos del producto antes de crear o modificar.
export const validateProduct = (req, res, next) => {
    const { nombre, precio, categoria, imagen, estado } = req.body;
    const errores = [];

    if (typeof nombre !== "string" || nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (precio === undefined || precio === "" || !Number.isFinite(Number(precio)) || Number(precio) <= 0) {
        errores.push("El precio debe ser un número mayor a 0");
    }

    if (typeof categoria !== "string" || !categoria.trim()) {
        errores.push("La categoría es obligatoria");
    }

    try {
        const url = new URL(imagen);
        if (!["http:", "https:"].includes(url.protocol)) {
            errores.push("La imagen debe tener una URL http o https válida");
        }
    } catch {
        errores.push("La URL de la imagen no es válida");
    }

    if (estado !== undefined && !["0", "1", 0, 1].includes(estado)) {
        errores.push("El estado debe ser activo (1) o inactivo (0)");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos de producto inválidos",
            errores
        });
    }

    next();
};

// Valida los datos para registrar un usuario administrador.
export const validateUser = (req, res, next) => {
    const { nombre, correo, contrasena } = req.body;
    const errores = [];

    if (typeof nombre !== "string" || nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof correo !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        errores.push("El correo no es válido");
    }

    if (typeof contrasena !== "string" || contrasena.length < 6) {
        errores.push("La contraseña debe tener al menos 6 caracteres");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos de usuario inválidos",
            errores
        });
    }

    next();
};
