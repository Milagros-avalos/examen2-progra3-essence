import { Router } from "express";
import { vistaCliente, registrarNombre, agregarAlCarrito, vistaCarrito, confirmarCompra } from "../controllers/client.controllers.js";

const router = Router();

router.get("/", vistaCliente);

router.post("/nombre", registrarNombre);

router.post("/carrito", agregarAlCarrito);

router.get("/carrito", vistaCarrito);

router.post("/confirmar-compra", confirmarCompra);


export default router;
