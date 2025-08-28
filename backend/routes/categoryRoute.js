// routes/categoryRoutes.js
import express from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController
} from "../controllers/categoryController.js";

const router = express.Router();

// ➝ Créer une catégorie
router.post("/", createCategoryController);

// ➝ Récupérer toutes les catégories
router.get("/", getCategoriesController);

// ➝ Récupérer une catégorie par ID
router.get("/:id", getCategoryByIdController);

// ➝ Mettre à jour une catégorie
router.put("/:id", updateCategoryController);

// ➝ Supprimer une catégorie
router.delete("/:id", deleteCategoryController);

export default router;
