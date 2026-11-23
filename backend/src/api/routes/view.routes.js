import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import { vistaPrincipal, vistaConsultar, vistaCrear, vistaModificar, vistaEliminar } from "../controllers/view.controllers.js";

const router = Router();

// Vista principal
router.get("/principal", requireLogin, vistaPrincipal);

// Vista consultar
router.get("/consultar", requireLogin, vistaConsultar);

// Vista crear
router.get("/crear", requireLogin, vistaCrear);

// Vista modificar
router.get("/modificar", requireLogin, vistaModificar);

// Vista eliminar
router.get("/eliminar", requireLogin, vistaEliminar);

export default router;
