import db from "../config/db.js";

// Ajouter/Creer un produit
export const createProducts = async (id,name,description,stock,price,createdAt,updatedAt,imageId,sellerId,categoryId) => {
    return await db.execute(
       "INSERT INTO Products(id, name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId) VALUES (?,?,?,?,?,?,?,?,?,?)",

        [id,name,description,stock,price,createdAt,updatedAt,imageId,sellerId,categoryId]
    );
};

// Obtenir tout les produits 
export const getProducts = async () => {
    return await db.execute("SELECT * FROM Products",[id]);
};

// Obtenir un produit par ID
export const getProductById = async(id) => {
    return await db.execute("SELECT * FROM Products WHERE id = ?", [id] );
};

// Modifier un produit
export const updateProduct = async (id, name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId) => {
    return await db.execute(
        "UPDATE Products SET name = ?, description = ?, stock = ?, price = ?, createdAt = ?, updatedAt = ?, imageId = ?, sellerId = ?, categoryId = ? WHERE id = ?",
        [name, description, stock, price, createdAt, updatedAt, imageId, sellerId, categoryId, id]
    );
};


// Supprimer un produit 
export const deleteProduct = async (id) => {
    return await db.execute("DELETE FROM Products WHERE id = ?", [id]);
};


