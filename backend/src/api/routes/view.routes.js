import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import {
    vistaPrincipal,
    vistaConsultar,
    vistaCrear,
    crearProducto,
    vistaModificar,
    modificarProducto,
    vistaEliminar,
    eliminarProducto
} from "../controllers/view.controllers.js";

const router = Router();

// Vista principal
router.get("/principal", requireLogin, vistaPrincipal);

// Vista consultar
router.get("/consultar", requireLogin, vistaConsultar);

// Vista crear
router.get("/crear", requireLogin, vistaCrear);
// Endpoint para crear producto
router.post("/crear", requireLogin, crearProducto);

// Vista modificar
router.get("/modificar", requireLogin, vistaModificar);
// Endpoint para modificar producto
router.post("/modificar", requireLogin, modificarProducto);

// Vista eliminar
router.get("/eliminar", requireLogin, vistaEliminar);
// Endpoint para eliminar producto
router.post("/eliminar", requireLogin, eliminarProducto);

export default router;
