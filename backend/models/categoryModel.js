import db from "../config/db.js"

export const createCategory = async (id,name) => {
    return await db.execute(
        "INSERT INTO Categories (id, name) VALUES (?,?)",
        [id,name]
    );
};

export const getCategories = async () => {
    return await db.execute (
        "SELECT * FROM Categories"
    );
};

export const getCategoryById = async (id) => {
    return await db.execute (
        "SELECT * FROM Categories WHERE id = ?", [id]
    );
};

export const updateCategory = async(id,name) => {
    return await db.execute (
        "UPDATE Categories SET name = ? WHERE id = ?",
        [name, id]
    );
};

// Supprimer une catégorie
export const deleteCategory = async(id) =>{
    return await db.execute (
        "DELETE FROM Categories WHERE id = ?", [id]
    );
};