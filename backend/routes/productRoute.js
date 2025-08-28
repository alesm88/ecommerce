import express from "express";
import {createProductController,getProductsController,getProductByIdController,updateProductController,deleteProductController} from "../controllers/productController.js";

const router = express.Router();

// Routes pour creer un produit
router.post("/creer", createProductController);

// Route pour récupérer tous les produits 
router.get("/obtenir",getProductsController);

// Route pour récupérer un produit par son Id
router.get("/obtenir/:id",getProductByIdController);

// Route pour modifier un produit
router.put("modifier",updateProductController);

// Route pour supprimer tout les produits 
router.delete("/supprimer",deleteProductController);

export default router;