// controllers/categoryController.js
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../models/categoryModel.js";

// ➝ Créer une catégorie
export const createCategoryController = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: "id et name sont obligatoires" });
    }
    await createCategory(id, name);
    res.status(201).json({ message: "Catégorie créée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie :", error);
    res.status(500).json({ error: "Impossible de créer la catégorie" });
  }
};

// ➝ Obtenir toutes les catégories
export const getCategoriesController = async (_req, res) => {
  try {
    const [rows] = await getCategories();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({ error: "Impossible de récupérer les catégories" });
  }
};

// ➝ Obtenir une catégorie par ID
export const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await getCategoryById(id);
    if (!rows.length) {
      return res.status(404).json({ error: "Catégorie non trouvée" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie :", error);
    res.status(500).json({ error: "Impossible de récupérer la catégorie" });
  }
};

// ➝ Mettre à jour une catégorie
export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Le champ name est obligatoire" });
    }
    await updateCategory(id, name);
    res.status(200).json({ message: "Catégorie mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error);
    res.status(500).json({ error: "Impossible de mettre à jour la catégorie" });
  }
};

// ➝ Supprimer une catégorie
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    res.status(500).json({ error: "Impossible de supprimer la catégorie" });
  }
};
