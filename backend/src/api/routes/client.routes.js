import { Router } from "express";
import { vistaCliente } from "../controllers/client.controllers.js";

const router = Router();

router.get("/", vistaCliente);

export default router;
