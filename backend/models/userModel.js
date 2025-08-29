import pool from "../config/db.js";
import bcrypt from 'bcrypt'

export const User = {
    create: async (user) => {
        const sql = 'INSERT INTO users (firstname, lastname, nickname, email, password, address, telephone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [user.firstname, user.lastname, user.nickname, user.email, user.password, user.address, user.telephone, user.role || 'buyer']);
        return result;
    },

    findByEmail: async (email) => {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows;
    },

    verifyEmail: async (email) => {
        const sql = 'UPDATE users SET is_verified = true WHERE email = ?';
        const [result] = await pool.execute(sql, [email]);
        return result;
    }
}

export const userLogin = async (email, password) => {
    try {
        const connexion = await pool.getConnection()

        const [user, fields] = await connexion.execute(`
        SELECT id, nickname, email, password, role FROM users WHERE email=?`, [email])
        if (!user.length) {
            return { status: 'failed', statusCode: 404, message: "L'utilisateur n'existe pas." }
        }
        else {
            const match = await bcrypt.compare(password, user[0].password)

            if (!match) {
                return { status: 'failed', statusCode: 401, message: "Le mot de passe est incorrect" }
            }
            delete user[0].password // Avoid to send the password to the front.
            return { status: 'success', statusCode: 200, user: user[0] }
        }
    }

    catch (error) {
        throw error
    }
}

export const changeUserRole = async (id, newRole) => {
    try {
        const con = await pool.getConnection()
        // Get the available roles
        const [rows, field] = await con.execute(`SHOW COLUMNS FROM users LIKE 'role';`, [])

        if (!rows[0].Type.includes(newRole)) {
            return { status: 'failed', statusCode: 400, message: "Le rôle n'est pas autorisé." }
        }

        const [user, fields] = await con.execute(`UPDATE users SET role=? WHERE id=?`, [newRole, id])

        if (!user.affectedRows) {
            return { status: 'failed', statusCode: 404, message: "L'utilisateur n'existe pas." }
        }
        else {
            return { status: 'success', statusCode: 200, message: `Le rôle à bien été modifié, nouveau rôle: ${newRole}` }
        }
    }

    catch (error) {
        throw error
    }
}