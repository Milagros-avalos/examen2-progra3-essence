import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getActiveProducts,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/product.controllers.js";
import {
    requireLoginApi,
    validateId,
    validateProduct
} from "../middlewares/middlewares.js";

const router = Router();

router.use(requireLoginApi);
router.get("/", getAllProducts);
router.get("/active", getActiveProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validateProduct, createProduct);
router.put("/", validateId, validateProduct, updateProduct);
router.delete("/:id", validateId, deleteProduct);

export default router;
