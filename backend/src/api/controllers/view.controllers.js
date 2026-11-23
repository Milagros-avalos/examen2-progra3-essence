/*============================
    Controladores vistas
============================*/

// Vista principal
export const vistaPrincipal = (req, res) => {
    res.render("index", {
        title: "Principal",
        usuario: req.session.user
    });
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
