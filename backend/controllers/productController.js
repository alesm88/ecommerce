import {
  createProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../models/productModel.js";

//  Créer un produit
export const createProductController = async (req, res) => {
  try {
    const { id, name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId } = req.body;

    const [result] = await createProducts(id, name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId);

    res.status(201).json({ message: "Produit créé avec succès", productId: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(500).json({ error: "Impossible de créer le produit" });
  }
};

//  Obtenir tous les produits
export const getProductsController = async (_req, res) => {
  try {
    const [rows] = await getProducts();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ error: "Impossible de récupérer les produits" });
  }
};

//  Obtenir un produit par ID
export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await getProductById(id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    res.status(500).json({ error: "Impossible de récupérer le produit" });
  }
};

//  Mettre à jour un produit
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId } = req.body;

    await updateProduct(id, name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId);

    res.status(200).json({ message: "Produit mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res.status(500).json({ error: "Impossible de mettre à jour le produit" });
  }
};

//  Supprimer un produit
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({ error: "Impossible de supprimer le produit" });
  }
};
