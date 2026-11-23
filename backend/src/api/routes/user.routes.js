import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";
import {
    requireLoginApi,
    validateUser
} from "../middlewares/middlewares.js";

const router = Router();

router.post("/", requireLoginApi, validateUser, createNewUser);

export default router;
