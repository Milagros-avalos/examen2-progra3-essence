/*============================
    Vistas del cliente
============================*/

export const vistaCliente = (req, res) => {
    res.render("cliente/index", {
        title: "Essence"
    });
};
