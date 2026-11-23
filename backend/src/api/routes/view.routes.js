import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import {
    vistaPrincipal,
    vistaConsultar,
    vistaCrear,
    vistaCrearUser,
    vistaModificar,
    vistaEliminar
} from "../controllers/view.controllers.js";

const router = Router();

// Vista principal
router.get("/principal", requireLogin, vistaPrincipal);

// Vista consultar
router.get("/consultar", requireLogin, vistaConsultar);

// Vista crear
router.get("/crear", requireLogin, vistaCrear);

// Vista para crear un usuario administrador
router.get("/crearUser", requireLogin, vistaCrearUser);

// Vista modificar
router.get("/modificar", requireLogin, vistaModificar);

// Vista eliminar
router.get("/eliminar", requireLogin, vistaEliminar);

export default router;
