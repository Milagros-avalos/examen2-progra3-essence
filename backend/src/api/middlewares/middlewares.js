// Middleware de autenticación para las vistas del dashboard.
export const requireLogin = (req, res, next) => {
    // Si no existe usuario en la sesion, redirigimos a la pantalla login
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};
